import React, { useState, useEffect, useContext } from 'react';
import { ActionType, SubActionType } from '@shared/types/types';
import { LookupContext } from '@root/src/context/LookupContext';
import { BlueprintContext } from '@root/src/context/BlueprintContext';
import ActionNode from './ActionNode';
import useHistory, { OperationType } from '@root/src/hooks/HistoryHooks';
import AddNode from './AddNode';
import clsx from 'clsx';


type ActionDesignerProps = React.HTMLAttributes<HTMLDivElement> & {
    selectedAction: ActionType,
}

const ActionDesigner: React.FC<ActionDesignerProps> = ({ selectedAction, ...props }) => {
    const { actionNames } = useContext(LookupContext);
    const { blueprint, updateBlueprint } = useContext(BlueprintContext)
    const { historyState, setHistory, useHistoryKeyboard, clearHistory } = useHistory<ActionType>(selectedAction);
    const [newNodeIndex, setNewNodeIndex] = useState<number | null>(null);
    const [deletedNodeIndex, setDeletedNodeIndex] = useState<number | null>(null);
    const [selectedNode, setSelectedNode] = useState<number | null>(null);

    useEffect(() => {
        clearHistory();
        setHistory(selectedAction);
    },[selectedAction]);

    useEffect(() => {
        document.addEventListener('keydown', useHistoryKeyboard);
        return () => {
            document.removeEventListener('keydown', useHistoryKeyboard);
        }
    },[useHistoryKeyboard]);


    const addActionToPipe = (newActionName: string, index: number = 0) => {
        const actionpipe = [...historyState.actionPipe];
        const bpAction = blueprint.actions.find(([,action]) => action.name === newActionName);
        if(!bpAction) return;
        const newAction: SubActionType = { ...bpAction[1] };
        actionpipe.splice(index, 0, newAction);
        setNewNodeIndex(index);
        setHistory({ ...historyState, actionPipe: actionpipe });
    };

    const addActionToGroup = (newActionName: string, subAction: SubActionType, index: number = 0) => {
        if(subAction.group) {
            const bpAction = blueprint.actions.find(([,action]) => action.name === newActionName);
            if(!bpAction) return;
            subAction.group.push(bpAction[1]);
        }
        else {
            const bpAction = blueprint.actions.find(([,action]) => action.name === newActionName);
            if(!bpAction) return;
            subAction.group = [bpAction[1]];
        }
        setHistory({ ...historyState, actionPipe: [...historyState.actionPipe] });
        setNewNodeIndex(index)
    }

    const deleteActionFromPipe = (index: number) => {
        const newArray = [...historyState.actionPipe]
        const action: ActionType = { ...historyState, actionPipe: newArray};
        action.actionPipe.splice(index, 1);
        setHistory(action);
        setDeletedNodeIndex(null);
    };

    const addActionToBlueprint = (actionToAdd: ActionType) => {
        const newActions = blueprint.actions.splice(-1, 0, [actionToAdd.id, actionToAdd])
        updateBlueprint({ ...blueprint, actions: newActions })
    }

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
            className='min-w-[95%] h-[95%] inline-flex items-start justify-start flex-row max-w-fit m-4 p-2 pt-8 bg-slate-700 overflow-x-scroll'
            onWheel={zoomContainer} 
            {...props}
        >
            <div className='flex items-center justify-start'>
                { 
                (historyState.actionPipe.length > 0) 
                ? 
                historyState.actionPipe.map((item, index) => {
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
                            <AddNode 
                                options={actionNames}
                                onNameSelect={name => addActionToGroup(name, item, index+1)}
                                className='absolute -top-4 flex-center w-0 outline-none'
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