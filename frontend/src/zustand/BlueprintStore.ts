import { ActionType, BlueprintType, EffectType, GameComponentType, ResourceType } from "@shared/types/types";
import { create } from "zustand";

// Define the store type
type BlueprintStoreType = {
    addGameComponent: (gameComponent: GameComponentType) => void;
    addResource: (resource: ResourceType) => void;
    addAction: (action: ActionType) => void;
    setActions: (actions: [string, ActionType][]) => void;
    setGameComponents: (gameComponents: [string, GameComponentType][]) => void;
    setResources: (resources: [string, ResourceType][]) => void;
    setEffects: (effects: [string, EffectType][]) => void; // Adjust type as needed
    setBlueprint: (blueprint: Partial<BlueprintType>) => void;
} & BlueprintType;

const useBlueprintStore = create<BlueprintStoreType>((set) => ({
    gameComponents: [],
    resources: [],
    actions: [],
    effects: [],
    addGameComponent: (gameComponent) =>
        set((state) => ({
            gameComponents: [...state.gameComponents, [gameComponent.id, gameComponent]],
        })),
    addResource: (resource) =>
        set((state) => ({
            resources: [...state.resources, [resource.id, resource]],
        })),
    addAction: (action) =>
        set((state) => ({
            actions: [...state.actions, [action.id, action]],
        })),
    setActions: (actions) => set({ actions }),
    setGameComponents: (gameComponents) => set({ gameComponents }),
    setResources: (resources) => set({ resources }),
    setEffects: (effects) => set({ effects }),
    setBlueprint: (blueprint) =>
        set((state) => ({
            ...state,
            ...blueprint,
        })),
}));

export const useBlueprint = () => {
    return useBlueprintStore((state) => state);
};

export const useBlueprintGameComponents = () => {
    return useBlueprintStore((state) => state.gameComponents);
};

export const useBlueprintResources = () => {
    return useBlueprintStore((state) => state.resources);
};

export const useBlueprintActions = () => {
    return useBlueprintStore((state) => state.actions);
};

export const useSetBlueprint = (partial: Partial<BlueprintStoreType>) => {
    return useBlueprintStore((state) => state.setBlueprint(partial));
};