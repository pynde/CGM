import { destroyPixiApp, initPixiApp, setPixiApp, usePixiApp, usePixiAppState } from '@root/src/zustand/PixiStore';
import React, { useEffect } from 'react';
import { Ticker } from 'pixi.js';
import { GameComponentType, isTypeOf } from '@shared/types/types';
import { createPixiComponent, createPixiLabelFromBaseType, createPlayArea, PIXI_COMPONENTS } from '../PixiComponents/PixiVanilla';
import { setSelection, useSelection } from '@root/src/zustand/SelectionStore';
import { TYPE_ENUM } from '@shared/enums/enums';
import { createSizeHandler } from '../PixiComponents/PixiTransformer';
import { useBlueprint, useBlueprintGameComponents, useBlueprintPlayAreas } from '@root/src/zustand/BlueprintStore';


const Overview: React.FC = () => {

    const pixiRootDiv = React.useRef<HTMLDivElement>(null);
    const pixiApp = usePixiApp();
    const selected = useSelection();
    const pixiAppState = usePixiAppState();
    const bpPlayAreas = useBlueprintPlayAreas();
    const bpComponents = useBlueprintGameComponents();

    useEffect(() => {
        // Init Pixi App and add to div container
        (async () => {
            if(pixiRootDiv.current && pixiAppState !== 'closing') {
                const app = await initPixiApp(pixiRootDiv.current);
                if(app) pixiRootDiv.current.appendChild(app.canvas);
                setPixiApp(app);
                app.start();
                console.log('app initialized and started', app, 'stage', app.stage);
            }
        })();
        return () => {
            destroyPixiApp();
        }
    }, []);

        useEffect(() => {
            if(!(pixiApp && bpComponents.length && bpPlayAreas.length)) return;
            console.log('bpComponents', bpComponents, 'bpPlayAreas', bpPlayAreas);
            // Add selected component to Pixi stage
                const pixiComponents = bpComponents.map(([,component]) => createPixiComponent(component));
                const playArea = createPlayArea(bpPlayAreas[0][1]);
                playArea.addChild(...pixiComponents);
                pixiApp.stage.addChild(playArea);   
                pixiApp.renderer.layout.update(pixiApp.stage);
            return () => {
                if(pixiApp?.stage) pixiApp?.stage.removeChildren();
            }
        }, [pixiApp, bpComponents, bpPlayAreas]);

    return <div ref={pixiRootDiv} className='w-[800px] h-[600px]'/>;
};

export default Overview;