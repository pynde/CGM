import React, { createContext, useContext, useMemo, useState } from 'react';
import { GameComponentType, ResourceType, ActionType, PlayerType, Owner } from '@shared/types/types';
import { useBlueprint } from '../zustand/BlueprintStore';
import { create } from 'zustand/react';


const useLookupStore = create<LookupContextType & LookupActions>((set) => ({
        gameComponentTypes: [],
        resourceTypes: [],
        actionTypes: [],
        actionNames: [],
        selected: {
            selectedComponent: undefined,
            selectedAction: undefined,
            selectedResource: undefined,
            selectedOwner: undefined
        },
        setSelected: (selected) => set({ selected }),
        setGameComponentTypes: (gameComponents) => { return set({ gameComponentTypes: gameComponents.map(gc => gc.type) }) },
        setResourceTypes: (resources) => { return set({ resourceTypes: resources.map(r => r.type) }) },
        setActionTypes: (actions) => { return set({ actionTypes: actions.map(a => a.type) }) },
        setUnSavedChanges: (unSavedChanges) => set({ unSavedChanges })
        })
    );

export const useLookup = () => {
    return useLookupStore((state) => state);
}
export const getGameComponentTypes = () => {
    return useLookupStore((state) => state.gameComponentTypes);
}
export const getResourceTypes = () => {
    return useLookupStore((state) => state.resourceTypes);
}
export const getActionTypes = () => {
    return useLookupStore((state) => state.actionTypes);
}

export type LookupContextType = {
    unSavedChanges?: boolean;
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
    setGameComponentTypes?: (gameComponents: GameComponentType[]) => void;
    setResourceTypes?: (gameComponents: ResourceType[]) => void;
    setActionTypes?: (gameComponents: ActionType[]) => void;
};

type LookupActions = { setSelected: (selected: LookupContextType['selected']) => void, setUnSavedChanges: (unsaved: boolean) => void } ;

export const LookupContext = createContext<LookupContextType & LookupActions>({ 
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
    setSelected: () => {},
    setUnSavedChanges: () => {}
});

export const LookupProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const bpStore = useBlueprint();

    const [selectedState, setSelected] = useState<LookupContextType['selected']>({
        selectedComponent: undefined,
        selectedAction: undefined,
        selectedResource: undefined,
        selectedOwner: undefined
    });

    const [unSavedChanges, setUnSavedChanges] = useState<boolean>(false);

    const _updateSelected = (selected_: LookupContextType['selected']) => {
        setSelected(selected_);
    };

    const _updateUnsavedChanges = (unsaved: boolean) => {
        setUnSavedChanges(unsaved);
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
            value={{ ...lookup, selected: selectedState, setSelected: _updateSelected, unSavedChanges, setUnSavedChanges: _updateUnsavedChanges }}>
            {children}
        </LookupContext.Provider>
        
    );
};