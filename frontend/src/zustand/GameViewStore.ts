import { BaseType, GameComponentType, VisualType } from '@shared/types/types';
import { create } from 'zustand';

export type GameViewType = {

} & GameComponentType


type GameViewStore = {
    views: GameViewType[];
    selectedViewId: string | null;
    addView: (view: GameViewType) => void;
    removeView: (id: string) => void;
    selectView: (id: string) => void;
    updateView: (id: string, updated: Partial<GameViewType>) => void;
    setViews: (views: GameViewType[]) => void;
    resetViews: () => void;
};

const useGameViewStore = create<GameViewStore>((set) => ({
    views: [],
    selectedViewId: null,
    addView: (view) =>
        set((state) => ({
            views: [...state.views, view],
        })),
    removeView: (id) =>
        set((state) => ({
            views: state.views.filter((v) => v.id !== id),
            selectedViewId: state.selectedViewId === id ? null : state.selectedViewId,
        })),
    selectView: (id) =>
        set(() => ({
            selectedViewId: id,
        })),
    updateView: (id, updated) =>
        set((state) => ({
            views: state.views.map((v) =>
                v.id === id ? { ...v, ...updated } : v
            ),
        })),
    setViews: (views) => set({ views }),
    resetViews: () => set({ views: [], selectedViewId: null }),
}));

export const useAddToView = (view: GameViewType) => {
    useGameViewStore.getState().addView(view);
}

export const useGetViews = () => {
    return useGameViewStore((state) => state.views);
};

export const useSelectView = (id: string) => {
    useGameViewStore.getState().selectView(id);
};  

export const useSelectedViewId = () => {
    return useGameViewStore((state) => state.selectedViewId)
};

export const useSetViews = (views: GameViewType[]) => {
    useGameViewStore.getState().setViews(views);
};

export const useResetGameViews = () => {
    useGameViewStore.getState().resetViews();
};