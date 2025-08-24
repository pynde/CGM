import React, { createContext, useContext, useMemo, useState } from 'react';
import { GameComponentType, ResourceType, ActionType, PlayerType, Owner } from '@shared/types/types';
import { useBlueprint } from '../zustand/BlueprintStore';

export type LookupContextType = {
    gameComponentTypes: GameComponentType['type'][];
    resourceTypes: ResourceType['type'][];
    actionTypes: ActionType['type'][];
    actionNames: ActionType['name'][];
    selected: {
        selectedComponent?: GameComponentType;
        selectedAction?: ActionType;
        selectedResource?: ResourceType;
        selectedOwner?: Owner<unknown>;
    };
};

type SelectedUpdate = { setSelected: (selected: LookupContextType['selected']) => void } ;

export const LookupContext = createContext<LookupContextType & SelectedUpdate>({ 
    gameComponentTypes: [], 
    resourceTypes: [], 
    actionTypes: [], 
    actionNames: [],
    selected: { 
        selectedComponent: undefined, 
        selectedAction: undefined, 
        selectedOwner: undefined, 
        selectedResource: undefined 
    }, 
    setSelected: () => {} 
});

export const LookupProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const bpStore = useBlueprint();

    const [selectedState, setSelected] = useState<LookupContextType['selected']>({
        selectedComponent: undefined,
        selectedAction: undefined,
        selectedResource: undefined,
        selectedOwner: undefined
    });

    const _updateSelected = (selected_: LookupContextType['selected']) => {
        setSelected(selected_);
    };

    const lookup = useMemo(() : LookupContextType => {
        const gameComponentTypes = bpStore.gameComponents.map(([key, value]) => value.type);
        const gameComponentNames = bpStore.gameComponents.map(([key, value]) => value.name);
        const resourceTypes = bpStore.resources.map(([key, value]) => value.type);
        const actionTypes = bpStore.actions.map(([key, value]) => value.type);
        const actionTypeNames = bpStore.actions.map(([key, value]) => value.name);
        return { gameComponentTypes, resourceTypes, actionTypes, selected: selectedState, actionNames: actionTypeNames };
    }, [bpStore]);

    return (
        <LookupContext.Provider 
            value={{ ...lookup, selected: selectedState, setSelected: _updateSelected }}>
            {children}
        </LookupContext.Provider>
        
    );
};