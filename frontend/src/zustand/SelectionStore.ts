import { ActionType, GameComponentType, isTypeOf, ResourceType } from '@shared/types/types';
import { create } from 'zustand';

export type SelectionItem = GameComponentType | ActionType | ResourceType;

interface SelectionStore {
    selection: SelectionItem | null;
    setSelection: (item: SelectionItem) => void;
    clearSelection: () => void;
}

const useSelectionStore = create<SelectionStore>((set) => ({
    selection: null,
    setSelection: (items) => set({ selection: items }),
    clearSelection: () => set({ selection: null }),
}));

/** Gets the current selection from the selection store. */
export const useSelection = () => {
    return useSelectionStore((state) => state.selection);
}
/** Adds an item to the selection store. */
export const setSelectionStore = (item: SelectionItem) => {
    useSelectionStore.getState().setSelection(item);
}
/** Removes an item from the selection store. */
export const clearSelectionStore = () => {
    useSelectionStore.getState().clearSelection();
}
/** Returns only selected items of type GameComponentType. Return empty array if none found. */
export const useSelectionTypeGuarded = <T>() => {
    return useSelectionStore((state) => {
        if(!state.selection) return null;
        if(isTypeOf<T>(state.selection, state.selection.type)) return state.selection as T;
        return null;
    });
};

