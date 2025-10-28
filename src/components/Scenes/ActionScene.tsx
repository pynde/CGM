import React from 'react';
import ActionDesigner from '../ActionDesigner/ActionDesigner';
import ComBox from '../UI/ComBox';
import { useBlueprint } from '@root/src/zustand/BlueprintStore';
import { useLookupActionTypes } from '@root/src/zustand/LookupStore';
import { setSelection, useSelectionTypeGuarded } from '@root/src/zustand/SelectionStore';
import { ActionType } from '@shared/types/types';
import { TYPE_ENUM } from '@shared/enums/enums';
import Button from '../UI/Button';


interface ActionSceneProps {

}

const ActionScene: React.FC<ActionSceneProps> = () => {
    const selected = useSelectionTypeGuarded<ActionType>(TYPE_ENUM.ACTION);
    const bpStore = useBlueprint();
    const actionTypes = bpStore.actions.map(([,value]) => { return value.type })

    const getSelectedAction = () => {
        if(selected) {
            return selected
        }
        return null
    }

    const changeSelected = (name: string | null) => {
        const newSelected = bpStore.actions.find(([,value]) => value.name === name);
        if(newSelected) setSelection(newSelected[1]);
    }

    return (
        <div className="action-scene flex items-center justify-start flex-col h-full gap-2 w-full py-10 overflow-hidden">
            <h2>Action</h2>
            { actionTypes.length > 0 ?
            <>
                <ComBox 
                    onNameSelect={(name) => changeSelected(name)} 
                    defaultValue={getSelectedAction()?.name}
                    placeholder='Select action...'
                    options={
                        bpStore.actions.map(([,action]) => action.name)
                    }
                />
                <button>...or add a new Action</button>
                { 
                selected 
                ? 
                <ActionDesigner 
                    selectedAction={selected}
                /> 
                : null 
                }
            </>
            : <div>Loading...</div>
            }
        </div>
    );
};

export default ActionScene;