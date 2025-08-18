import React, { createContext, useContext, useMemo, useState } from 'react';
import { GameComponentType, ResourceType, ActionType, PlayerType, Owner } from '@shared/types/types';
import { BlueprintContext } from './BlueprintContext';

export type LookupContextType = {
    gameComponentTypes: GameComponentType['type'][];
    resourceTypes: ResourceType['type'][];
    actionTypes: ActionType['type'][];
    actionNames: ActionType['name'][];
    selected: {
        selectedComponent: GameComponentType<unknown> | null;
        selectedAction: ActionType | null;
        selectedResource: ResourceType | null;
        selectedOwner: Owner<unknown> | null;
    };
};

type SelectedUpdate = { updateSelected: (selected: LookupContextType['selected']) => void } ;

export const LookupContext = createContext<LookupContextType & SelectedUpdate>({ 
    gameComponentTypes: [], 
    resourceTypes: [], 
    actionTypes: [], 
    actionNames: [],
    selected: { 
        selectedComponent: null, 
        selectedAction: null, 
        selectedOwner: null, 
        selectedResource: null 
    }, 
    updateSelected: () => {} 
});

export const LookupProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { blueprint } = useContext(BlueprintContext);

    const [selectedState, setSelected] = useState<LookupContextType['selected']>({
        selectedComponent: null,
        selectedAction: null,
        selectedResource: null,
        selectedOwner: null
    });

    const _updateSelected = (selected_: LookupContextType['selected']) => {
        setSelected(selected_);
    };

    const lookup = useMemo(() : LookupContextType => {
        const gameComponentTypes = blueprint.gameComponents.map(([key, value]) => value.type);
        const gameComponentNames = blueprint.gameComponents.map(([key, value]) => value.name);
        const resourceTypes = blueprint.resources.map(([key, value]) => value.type);
        const actionTypes = blueprint.actions.map(([key, value]) => value.type);
        const actionTypeNames = blueprint.actions.map(([key, value]) => value.name);
        return { gameComponentTypes, resourceTypes, actionTypes, selected: selectedState, actionNames: actionTypeNames };
    }, [blueprint]);

    return (
        <LookupContext.Provider 
            value={{ ...lookup, selected: selectedState, updateSelected: _updateSelected }}>
            {children}
        </LookupContext.Provider>
        
    );
};