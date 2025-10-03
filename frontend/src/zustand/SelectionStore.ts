import { SELECTION_TYPE_ENUM, TYPE_ENUM } from '@shared/enums/enums';
import { ActionType, BaseType, GameComponentType, isTypeOf, ResourceType } from '@shared/types/types';
import { create } from 'zustand';

export type SelectionItem = GameComponentType | ActionType | ResourceType;

interface SelectionStore {
    readonly context: TYPE_ENUM | null;
    selection: SelectionItem | null;
    setContext: (context: TYPE_ENUM | null) => void;
    setSelection: (item: SelectionItem) => void;
    clearSelection: () => void;
}
/**
 * Zustand store for managing the current selection in the application.
 * It allows setting and clearing the selection of game components, actions, or resources.
 * It also keeps track of the current context in which the selection is made (Game component, Action, Resource).
 */
const useSelectionStore = create<SelectionStore>((set) => ({
    context: null,
    selection: null,
    setSelection: (items) => set({ selection: items }),
    setContext: (context) => set({ context }),
    clearSelection: () => set({ selection: null }),
}));

/** Gets the current selection from the selection store. */
export const useSelection = () => {
    return useSelectionStore((state) => state.selection);
}
/** Adds an item to the selection store. */
export const setSelection = (item: SelectionItem) => {
    useSelectionStore.getState().setSelection(item);
    useSelectionStore.getState().setContext(item.type);
    
}

/** Removes an item from the selection store. */
export const clearSelectionStore = () => {
    useSelectionStore.getState().clearSelection();
}
/** Returns only selected items of wanted type. Return empty array if none found. */
export const useSelectionTypeGuarded = <T>(type: TYPE_ENUM) => {
    return useSelectionStore((state) => {
        if(!state.selection) return null;
        if(isTypeOf<T>(state.selection, type)) return state.selection as T;
        return null;
    });
};

