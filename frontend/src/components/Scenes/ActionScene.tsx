import { ACTION_TYPE_ENUM, GAME_COMPONENT_ENUM } from '@shared/enums/enums';
import { ActionType, GameComponentType, isTypeOf } from '@shared/types/types';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Action from '../Actions/Action';
import { LookupContext } from '@root/src/context/LookupContext';
import { BlueprintContext } from '@root/src/context/BlueprintContext';
import ActionDesigner from '../ActionDesigner/ActionDesigner';
import ComBox from '../UI/ComBox';


interface ActionSceneProps {

}

const ActionScene: React.FC<ActionSceneProps> = () => {
    const { selected, updateSelected, actionTypes } = useContext(LookupContext);
    const { blueprint } = useContext(BlueprintContext);

    const getSelectedAction = () => {
        if(selected.selectedAction) {
            return selected.selectedAction
        }
        return null
    }

    const changeSelected = (name: string | null) => {
        const newSelected = blueprint.actions.find(([,value]) => value.name === name);
        if(newSelected) updateSelected({ ...selected, selectedAction: newSelected[1] });
    }

    return (
        <div className="action-scene flex items-center justify-start flex-col h-full w-full py-10 overflow-hidden">
            <h2>Action</h2>
            { actionTypes.length > 0 ?
            <>
                <ComBox 
                    onNameSelect={(name) => changeSelected(name)} 
                    defaultValue={getSelectedAction()?.name}
                    placeholder='Select action...'
                    options={
                        blueprint.actions.map(([,action]) => action.name)
                    }
                />
                { 
                selected.selectedAction 
                ? 
                <ActionDesigner 
                    selectedAction={selected.selectedAction}
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