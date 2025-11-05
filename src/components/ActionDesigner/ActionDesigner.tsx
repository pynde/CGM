import { createHistoryStore, HistoryStore, OperationType } from '@root/src/hooks/HistoryHooks';
import { moveNodeToActionNodeTreeGroup } from '@root/src/zustand/ActionNodeTreeStore';
import { useBlueprint, useBlueprintActions, useSetBlueprint } from '@root/src/zustand/BlueprintStore';
import { ActionType, SubActionType } from '@shared/types/types';
import clsx from 'clsx';
import React, { useContext, useEffect, useRef, useState } from 'react';
import ActionNode from './ActionNode';
import AddGroupNode from './AddGroupNode';
import AddNode from './AddNode';


type ActionDesignerProps = React.HTMLAttributes<HTMLDivElement> & {
    selectedAction: ActionType,
}

const { useHistory, setHistory, clearHistory, useHistoryKeyboard } = createHistoryStore<ActionType | null>(null);

const ActionDesigner: React.FC<ActionDesignerProps> = ({ selectedAction, ...props }) => {
    const bpStore = useBlueprint();
    const historyInitialized = useRef<boolean>(false);
    const actionNames = useBlueprintActions().map(([_, value]) => { return value.name });
    const actionNodeHistory = useHistory();
    const [newNodeIndex, setNewNodeIndex] = useState<number | null>(null);
    const [deletedNodeIndex, setDeletedNodeIndex] = useState<number | null>(null);
    const [selectedNode, setSelectedNode] = useState<number | null>(null);

    useEffect(() => {
        // TODO: 
        console.log('selectedAction', selectedAction);
        clearHistory();
        setHistory(selectedAction);
    },[selectedAction]);

    useEffect(() => {
        document.addEventListener('keydown', useHistoryKeyboard);
        return () => {
            document.removeEventListener('keydown', useHistoryKeyboard);
        }
    },[useHistoryKeyboard]);

    useEffect(() => { console.log('actionNodeHistory', actionNodeHistory.present); console.log('newIndex', newNodeIndex, 'deletedIndex', deletedNodeIndex); }, [actionNodeHistory.present]);

    /** Adds a new action to the action pipe.
     * If index is provided, adds the action at the specified index.
     * If index is not provided, adds the action at the end of the action pipe.
     */
    const addActionToPipe = (newActionName: string, index?: number) => {
        if(!actionNodeHistory.present) return;
        const present = actionNodeHistory.present;
        const actionpipe = [...present.actionPipe];
        const bpAction = bpStore.actions.find(([,action]) => action.name === newActionName);
        if(!bpAction) return;
        const newAction: SubActionType = bpAction[1];
        if(index === undefined) index = actionpipe.length;
        actionpipe.splice(index, 0, newAction);
        setNewNodeIndex(index);
        setHistory({ ...present, actionPipe: [...actionpipe] });
    };

    const addActionToGroup = (newActionName: string, subAction: SubActionType, index: number = 0) => {
        if(!actionNodeHistory.present) return;
        if(subAction.group) {
            const bpAction = bpStore.actions.find(([,action]) => action.name === newActionName);
            if(!bpAction) return;
            subAction.group.push(bpAction[1]);
        }
        else {
            const bpAction = bpStore.actions.find(([,action]) => action.name === newActionName);
            if(!bpAction) return;
            subAction.group = [bpAction[1]];
        }
        setHistory({ ...actionNodeHistory.present, actionPipe: [...actionNodeHistory.present.actionPipe] });
        setNewNodeIndex(index)
    }

    const deleteActionFromPipe = (index: number) => {
        if(!actionNodeHistory.present) return;
        const present = actionNodeHistory.present;
        const newArray = [...present.actionPipe]
        const action: ActionType = { ...present, actionPipe: newArray};
        action.actionPipe.splice(index, 1);
        setHistory(action);
        setDeletedNodeIndex(null);
    };


    const zoomContainer = (e: React.WheelEvent<HTMLDivElement>) => {
        if(e.deltaX !== 0) return;
        e.currentTarget.style.transform = `scale(${e.deltaY > 0 ? 0.9 : 1.1})`;
    }

    const panContainer = (e: React.MouseEvent<HTMLDivElement>) => {
        
    }

    const handleAnimationEnd = (index: number) => {
        if(newNodeIndex === index) {
            setSelectedNode(index)
            setNewNodeIndex(null);
        } 
        else if(deletedNodeIndex === index) {
            setSelectedNode(null)
            deleteActionFromPipe(index);
        } 
    }

    return (
        <div 
            className='min-w-[95%] h-[95%] inline-flex items-start justify-start flex-row  max-w-fit m-4 p-2 pt-8 bg-slate-700 overflow-x-scroll'
            onWheel={zoomContainer} 
            {...props}
        >
            <div className='flex items-center justify-start'>
                { 
                (actionNodeHistory.present && actionNodeHistory.present.actionPipe.length > 0) 
                ? 
                actionNodeHistory.present.actionPipe.map((item, index) => {
                    return (
                    <div className={clsx(item.group ? 'bg-cyan-900' : 'bg-darkbg',`rounded-md p-4 flex-center flex-col-reverse`)}>
                        {item.group && <span className='m-2'>Any of these actions</span>}
                        <ActionNode 
                            index={index} 
                            onDeleteActionFromPipe={(index) => setDeletedNodeIndex(index)} 
                            onAnimationEnd={() => handleAnimationEnd(index)}
                            animateIn={newNodeIndex === index}
                            animateOut={deletedNodeIndex === index}
                            active={selectedNode === index}
                            {...item}
                        >
                            <AddNode 
                                options={actionNames} 
                                onNameSelect={name => addActionToPipe(name, index+1)}
                                className='absolute right-0 flex-center w-0 h-0 outline-none'
                            />
                            <AddGroupNode 
                                onClick={() => moveNodeToActionNodeTreeGroup(item.id, 'group-'+index)}
                            />
                            </ActionNode>
                        { 
                        item.group && item.group.map((subAction, subIndex) => {
                            return (
                                <ActionNode 
                                    index={subIndex} 
                                    onDeleteActionFromPipe={(subIndex) => setDeletedNodeIndex(subIndex)} 
                                    onAnimationEnd={() => handleAnimationEnd(subIndex)}
                                    animateIn={newNodeIndex === subIndex}
                                    animateOut={deletedNodeIndex === subIndex}
                                    active={selectedNode === subIndex}
                                    {...subAction}
                                >
                                    <AddNode 
                                        options={actionNames} 
                                        onNameSelect={name => addActionToPipe(name, subIndex+1)}
                                        className='absolute right-0 flex-center w-0 outline-none'
                                    />
                                    <AddNode 
                                        options={actionNames}
                                        onNameSelect={(name) =>  addActionToGroup(name, subAction, subIndex+1)}
                                        className='absolute -top-4 flex-center w-0 outline-none'
                                    />
                                </ActionNode>
                            )
                        }
                        )
                    }
                    </div>
                    )
                }

                ) 
                : 
                <div>
                    <AddNode 
                        options={actionNames}
                        onNameSelect={addActionToPipe}
                        placeholder='Insert action in the flow' 
                    />
                </div>
                
                }
            </div>
        </div>
    );
};

export default ActionDesigner;