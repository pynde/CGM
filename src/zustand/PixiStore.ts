import { Application, Container, Ticker } from 'pixi.js';
import { create } from 'zustand/react';
import "@pixi/layout";

export type AppState = 'idle' | 'closed' | 'uninitialised' | 'running' | 'closing';

interface PixiStoreState {
    app: Application | null;
    setApp: (app: Application | null) => void;
    appState: AppState;
    setAppState: (context: AppState) => void;
    selectedPixiContainer: Container | null;
    setSelectedPixiContainer: (container: Container | null) => void;
}

const usePixiStore = create<PixiStoreState>((set) => ({
    app: null,
    setApp: (app) => set({ app }),
    appState: 'uninitialised',
    setAppState: (context) => set({ appState: context }),
    selectedPixiContainer: null,
    setSelectedPixiContainer: (newContainer) => set({ selectedPixiContainer: newContainer })
}));

export const usePixiApp = () => usePixiStore(state => state.app);
export const useAppState = () => usePixiStore.getState().appState;
export const setPixiApp = (app: Application | null) => usePixiStore.getState().setApp(app);
export const setAppState = (context: AppState) => usePixiStore.setState({ appState: context });
export const usePixiAppState = () => usePixiStore(state => state.appState);
export const initPixiApp = async(resizeToElement: HTMLElement) => {
    const app = new Application();
    await app.init({ 
        resizeTo: resizeToElement, 
        backgroundColor: 'blue', 
        preference: 'webgpu',
        autoStart: false,
        layout: {
            layout: {
                autoUpdate: false,
                enableDebug: false,
                debugModificationCount: 0,
                throttle: 100
            }
        }
    });
    app.stage.layout = {
        width: resizeToElement.clientWidth,
        height: resizeToElement.clientHeight,
        justifyContent: 'center',
        alignItems: 'center'
    }
    setAppState('running');
    return app
};
export const setSelectedPixiContainer = (container: Container | null) => usePixiStore.setState({ selectedPixiContainer: container });
export const useSelectedPixiContainer = () => usePixiStore.getState().selectedPixiContainer;
export const destroyPixiApp = () => {
    const app = usePixiStore.getState().app;
    if(app) {
        // NOTE: If problems with destroying the app, try adding a small timeout here. 
        // Pixi Layout didn't check if element existed and tried to call a method on a null object.
        // Bug was fixed in pixi v3.2.0. 
        setAppState('closing');
        app.stop();
        app.stage.destroy({children:true});
        app.destroy();
        setAppState('closed');
        setPixiApp(null);
    }
}
