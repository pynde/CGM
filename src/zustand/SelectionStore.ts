import { SELECTION_TYPE_ENUM, TYPES_AS_STRING } from '@shared/enums/enums';
import { ActionType, BaseType, GameComponentType, isTypeOf, ResourceType } from '@shared/types/types';
import { create } from 'zustand';

export type SelectionItem = GameComponentType | ActionType | ResourceType;

type SelectionContext = 'edit' | 'play' | 'view' | keyof typeof TYPES_AS_STRING | null;
type SelectionRange = 'single' | 'multiple' | 'none';

interface SelectionStore {
    readonly context: SelectionContext;
    range: SelectionRange;
    selection: Map<SelectionItem['id'], SelectionItem>;
    setRange: (range: SelectionRange) => void;
    setContext: (context: SelectionContext) => void;
    setSelection: (item: Map<SelectionItem['id'], SelectionItem>) => void;
    clearSelection: () => void;
}
/**
 * Zustand store for managing the current selection in the application.
 * It allows setting and clearing the selection of game components, actions, or resources.
 * It also keeps track of the current context in which the selection is made (Game component, Action, Resource).
 */
const useSelectionStore = create<SelectionStore>((set) => ({
    context: null,
    selection: new Map(),
    range: 'none',
    setRange: (range) => set({ range }),
    setSelection: (items) => set({ selection: items }),
    setContext: (context) => set({ context }),
    clearSelection: () => set({ selection: new Map() }),
}));

/** Gets the current selection from the selection store. */
export const useSelection = () => {
    return useSelectionStore((state) => state.selection);
}

/** Adds an item to the selection store.
 * @param item The item to add to the selection.
 * @param context Optional context of edit, play or view to set for the selection. If not provided, the item's type will be used.
 * @param range Optional range of selection (single, multiple, none). Defaults to 'single'.
 */
export const setSelection = (item: SelectionItem, context?: SelectionContext, range: SelectionRange = 'single') => {
    
    if(range === 'single') {
        const newMap = new Map([[item.id, item]]);
    }
    else if(range === 'multiple') {
        const s = useSelectionStore.getState().selection;
        s.set(item.id, item);
        useSelectionStore.getState().setSelection(s);
    }
    useSelectionStore.getState().setContext(context || item.type);
    useSelectionStore.getState().setRange(range);
}

export const setSelectionContext = (context: SelectionContext) => {
    useSelectionStore.getState().setContext(context);
}

export const getCurrentSelection = () => {
    return useSelectionStore.getState().selection;
}

/** Removes an item from the selection store. */
export const clearSelectionStore = () => {
    useSelectionStore.getState().clearSelection();
    useSelectionStore.getState().setContext(null);
}
/** Returns only selected items of wanted type. Return empty array if none found. */
export const useSelectionTypeGuarded = <T>(type: keyof typeof TYPES_AS_STRING) => {
    return useSelectionStore((state) => {
        if(!state.selection) return null;
        if(isTypeOf<T>(state.selection, type)) return state.selection as T;
        return null;
    });
};

