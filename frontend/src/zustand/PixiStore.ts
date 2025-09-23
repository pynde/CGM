import { Application, Container } from 'pixi.js';
import { createStore } from 'zustand/vanilla';

export type StageEventContext = 'idle' | 'dragging' | 'selecting' | 'resize-width' | 'resize-height' | 'resize-size';

interface PixiStoreState {
    app: Application | null;
    setApp: (app: Application) => void;
    stageEventContext: StageEventContext;
    setStageEventContext: (context: StageEventContext) => void;
    selectedPixiContainer: Container | null;
    setSelectedPixiContainer: (container: Container | null) => void;
}

const usePixiStore = createStore<PixiStoreState>((set) => ({
    app: null,
    setApp: (app) => set({ app }),
    stageEventContext: 'idle',
    setStageEventContext: (context) => set({ stageEventContext: context }),
    selectedPixiContainer: null,
    setSelectedPixiContainer: (newContainer) => set({ selectedPixiContainer: newContainer })
}));

export const usePixiApp = () => usePixiStore.getState().app;
export const useStageEventContext = () => usePixiStore.getState().stageEventContext;
export const setPixiApp = (app: Application | null) => usePixiStore.setState({ app });
export const setStageEventContext = (context: StageEventContext) => usePixiStore.setState({ stageEventContext: context });
export const initPixiApp = async(resizeToElement: HTMLElement) => {
    const app = new Application();
    await app.init({ resizeTo: resizeToElement, backgroundColor: 'blue', preference: 'webgpu' });
    app.stage.layout = {
        width: resizeToElement.clientWidth,
        height: resizeToElement.clientHeight,
        justifyContent: 'center',
        alignItems: 'center'
    }
    setPixiApp(app);
    return app
};
export const setSelectedPixiContainer = (container: Container | null) => usePixiStore.setState({ selectedPixiContainer: container });
export const useSelectedPixiContainer = () => usePixiStore.getState().selectedPixiContainer;
export const destroyPixiApp = () => {
    const app = usePixiApp();
    if(app) {
        //app.stage.layout?.destroy();
        app.destroy();
    }
}
