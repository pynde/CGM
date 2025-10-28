import { create } from 'zustand';

export type OperationType = { operationType: 'create' | 'update' | 'delete' | 'init' };


export type HistoryStore<T> = {
    past: T[],
    present: T,
    future: T[],
    setHistory: (newPresent: T) => void;
    undo: () => void;
    redo: () => void;
    clearHistory: () => void;
};
export const createHistoryStore = <T,>(initialPresent: T) => {
   const useHistoryStore = create<HistoryStore<T>>((set) => ({
        past: [],
        present: initialPresent,
        future: [],
        setHistory: (newPresent: T) => {
            set((state) => ({
                past: [...state.past, state.present],
                present: newPresent,
                future: [],
            }));
        },
        undo: () => {
            set((state) => {
                if (state.past.length === 0) return state;
                const previous = state.past[state.past.length - 1];
                const newPast = state.past.slice(0, state.past.length - 1);
                return {
                    past: newPast,
                    present: previous,
                    future: [state.present, ...state.future],

                };
            });
        },
        redo: () => {
            set((state) => {
                if (state.future.length === 0)return state;
                const next = state.future[0];
                const newFuture = state.future.slice(1);
                return {
                        past: [...state.past, state.present],
                        present: next,
                        future: newFuture,

                };
            });
        },
        clearHistory: () => {
            set(() => ({
                    past: [],
                    present: initialPresent,
                    future: [],
                
            }));
        }
    }));
    
    const useHistory = () => useHistoryStore((state) => state);
    const setHistory = (newPresent: T) => useHistoryStore.getState().setHistory(newPresent);
    const clearHistory = () => useHistoryStore.getState().clearHistory();
    /** Keyboard event handler for undo/redo actions. 
     * cmd/ctrl + z for undo 
     * cmd/ctrl + y for redo */
    const useHistoryKeyboard = (event: KeyboardEvent) => {
        if(event.target instanceof HTMLInputElement) return;
        if ((event.metaKey || event.ctrlKey) && event.key === 'z') {
            event.preventDefault();
            useHistoryStore.getState().undo();
        }
        if ((event.metaKey || event.ctrlKey) && event.key === 'y') {
            event.preventDefault();
            useHistoryStore.getState().redo();
        }
    }

    return { useHistory, setHistory, clearHistory, useHistoryKeyboard };

}



