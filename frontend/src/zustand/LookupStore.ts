import { ActionType, GameComponentType, ResourceType } from "@shared/types/types";
import { create } from "zustand";

const useLookupStore = create<LookupStoreType>((set) => ({
        gameComponentTypes: [],
        resourceTypes: [],
        actionTypes: [],
        actionNames: [],
        setGameComponentTypes: (gameComponents) => { return set({ gameComponentTypes: gameComponents.map(gc => gc.type) }) },
        setResourceTypes: (resources) => { return set({ resourceTypes: resources.map(r => r.type) }) },
        setActionTypes: (actions) => { return set({ actionTypes: actions.map(a => a.type) }) },
        })
    );

// export const useLookup = () => {
//     return useLookupStore((state) => state);
// }

export const useLookupActionNames = () => {
    return useLookupStore((state) => state.actionNames);
}

export const useLookupActionTypes = () => {
    return useLookupStore((state) => state.actionTypes);
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

export type LookupStoreType = {
    gameComponentTypes: GameComponentType['type'][];
    resourceTypes: ResourceType['type'][];
    actionTypes: ActionType['type'][];
    actionNames: ActionType['name'][];
    setGameComponentTypes?: (gameComponents: GameComponentType[]) => void;
    setResourceTypes?: (gameComponents: ResourceType[]) => void;
    setActionTypes?: (gameComponents: ActionType[]) => void;
};
