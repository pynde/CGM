import { useState, useCallback, useEffect } from 'react';

export type OperationType = { operationType: 'create' | 'update' | 'delete' | 'init' };

type HistoryState<T> = {
    past: T[];
    present: T;
    future: T[];
};

function useHistory<T>(initialPresent: T) {
    const [historyState, setState] = useState<HistoryState<T>>({
        past: [],
        present: initialPresent,
        future: [],
    });

    useEffect(() => {
        console.log('historyState', historyState);
    }, [historyState]);

    const setHistory = useCallback((newPresent: T) => {
        setState((currentState) => {
            return {
                past: [...currentState.past, currentState.present],
                present: newPresent,
                future: [], 
            }
        });
    }, []);

    const undo = useCallback(() => {
        setState((currentState) => {
            const { past, present, future } = currentState;
            if (past.length === 0) return currentState;

            const previous = past[past.length - 1];
            const newPast = past.slice(0, past.length - 1);
            
            return {
            past: newPast, // Keep only the last 49 items to ensure a maximum of 50 undos
            present: previous,
            future: [present, ...future],
            };
        });
    }, []);

    const redo = useCallback(() => {
        setState((currentState) => {
            const { past, present, future } = currentState;
            if (future.length === 0) return currentState;

            const next = future[0];
            const newFuture = future.slice(1);

            return {
                past: [...past, present],
                present: next,
                future: newFuture,
            };
        });
    }, []);

    const clearHistory = useCallback(() => {
        setState((currentState) => {
            return {
                past: [],
                present: initialPresent,
                future: [],
            };
        });
    }, []);

    const useHistoryKeyboard = useCallback((event: KeyboardEvent) => {
        if(event.target instanceof HTMLInputElement) return;
        if ((event.metaKey || event.ctrlKey) && event.key === 'z') {
            event.preventDefault();
            undo();
        }
        if ((event.metaKey || event.ctrlKey) && event.key === 'y') {
            event.preventDefault();
            redo();
        }
    },[undo, redo]);

    return { historyState: historyState.present, setHistory, undo, redo, useHistoryKeyboard, clearHistory };
}

export default useHistory;