import * as ContextMenu from '@radix-ui/react-context-menu';
import { useBlueprint, useSetBlueprint, useShallowBlueprint, useUpdateBlueprintGameComponents } from '@root/src/zustand/BlueprintStore';
import { destroyPixiApp, initPixiApp, setPixiApp, usePixiApp, usePixiAppState } from '@root/src/zustand/PixiStore';
import { SelectionItem, setSelection, useSelection } from '@root/src/zustand/SelectionStore';
import { ACTION_TYPE_ENUM, RESOURCE_ENUM, TYPES_AS_STRING } from '@shared/enums/enums';
import { ActionType, GameComponentType, isTypeOf, ResourceType, VisualType } from '@shared/types/types';
import { Ticker } from 'pixi.js';
import React, { useEffect } from 'react';
import BlueprintMenu from '../BlueprintMenu/BlueprintMenu';
import { createSizeHandler, createTransformer } from '../PixiComponents/PixiTransformer';
import { createPixiComponent, createPixiLabelFromBaseType, PIXI_COMPONENTS } from '../PixiComponents/PixiVanilla';
import Carousel from '../UI/Carousel';
import SaveButton from '../UI/SaveButton';
import Visuals from '../Views/Visuals';

// Props interface for the ComponentDesigner
interface ComponentDesignerProps {
    propOne?: string;
}

// TODO Change BlueprintContext to use Zustand store
export const ComponentDesigner: React.FC<ComponentDesignerProps> = () => {
    const setBlueprint = useSetBlueprint; 
    const setGameComponents = useUpdateBlueprintGameComponents
    const bpStore = useBlueprint();
    const selected = useSelection().values().next().value;
    const pixiRootDiv = React.useRef<HTMLDivElement>(null);
    const pixiApp = usePixiApp();
    const pixiAppState = usePixiAppState();
    
    
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
    }, [pixiAppState]);

    useEffect(() => {
        if(!pixiApp) return;
        const ticker = new Ticker();
        // Add selected component to Pixi stage
        if (isTypeOf<GameComponentType>(selected, TYPES_AS_STRING.GAME_COMPONENT)) {
            const label = createPixiLabelFromBaseType(selected, PIXI_COMPONENTS.CONTAINER);
            if(!pixiApp.stage) return () => { ticker.destroy(); };
            const oldPixiGameComponent = pixiApp.stage.getChildByLabel(label, false);
            if(oldPixiGameComponent) oldPixiGameComponent.destroy();
            const newPixiGameComponent = createPixiComponent({
                id: selected.id,
                name: selected.name,
                type: selected.type,
                ...selected.style
            });
            // Update layout so transformer can get correct width/height
            pixiApp.renderer.layout.update(newPixiGameComponent);
            
        ticker.addOnce(() => {
              const pixiTransformer = createSizeHandler(newPixiGameComponent, pixiApp, () => {
                setSelection({
                    ...selected,
                    style: {
                        ...selected.style,
                        width: newPixiGameComponent.layout?.computedLayout.width || selected.style?.width || 0,
                        height: newPixiGameComponent.layout?.computedLayout.height || selected.style?.height || 0,
                    }
                })
              });
              // Add transformer handles to stage by converting object values to array and spreading them as children
              pixiApp.stage.addChild(pixiTransformer);
            }).start();
            console.log('adding Pixi component to stage');
            pixiApp.stage.addChild(newPixiGameComponent);   
            pixiApp.renderer.layout.update(pixiApp.stage);  
        }
        return () => {
            if(pixiApp?.stage) pixiApp?.stage.removeChildren();
            ticker.destroy();
        }
    }, [selected?.id, selected?.style, pixiApp]);



    const setSelectedComponent = (index: number) => {
        if (bpStore.gameComponents[index]) {
            setSelection(bpStore.gameComponents[index][1]);
        }
    }

    const updateVisuals = (updatedItem: Partial<VisualType>) => {
        if(isTypeOf<GameComponentType>(selected, TYPES_AS_STRING.GAME_COMPONENT)) {
            if(!selected.style) return;
            const updatedComponent = {
            ...selected,
            style: {
                ...selected.style,
                ...updatedItem
            }
            };
            const gcMap = new Map(bpStore.gameComponents);
            gcMap.set(selected.id, updatedComponent);
            setBlueprint({
                ...bpStore,
                gameComponents: Array.from(gcMap.entries())
            });
        }
        if(isTypeOf<ResourceType>(selected, RESOURCE_ENUM)) {
            if(selected.style) {
                const updatedResource = {
                ...selected,
                style: {
                ...selected.style,
                ...updatedItem
                }
                };
                const rMap = new Map(bpStore.resources);
                rMap.set(selected.id, updatedResource);
                
                setBlueprint({
                ...bpStore,
                resources: Array.from(rMap.entries())
                });
            }
        }
        if(isTypeOf<ActionType>(selected, ACTION_TYPE_ENUM)) {
                if(selected.style) {
                    const updatedAction = {
                    ...selected,
                    style: {
                    ...selected.style,
                    ...updatedItem
                    }
                    };
                    const aMap = new Map(bpStore.actions);
                    aMap.set(selected.id, updatedAction);
                    
                    setBlueprint({
                    ...bpStore,
                    actions: Array.from(aMap.entries())
                    });
            }
        }
}

    const updateSelectedComponent = (updatedComponent: SelectionItem) => {
        setSelection(updatedComponent);
    }

    const saveUpdate = () => {
        if(!selected) return;
        const newGCArray = bpStore.gameComponents.map(([key, value]) => {
            if(selected.id == key) return [key, selected] as [string, GameComponentType];
            return [key, value] as [string, GameComponentType];
        });
        setGameComponents(newGCArray);
    }

    return (
            <div className="component-builder flex flex-row mx-auto h-full space-x-2" style={{width: '100%', height: '100%'}}>   
                <Carousel 
                    title={selected?.name || 'No component selected'} 
                    className='h-full' 
                    arrayLength={bpStore.gameComponents.length} 
                    onNextOrPrevious={(index) => setSelectedComponent(index)}>
                    <ContextMenu.Root modal={true}>
                    <ContextMenu.Trigger>
                        <div className='container w-[500px] h-[500px]' ref={pixiRootDiv}>
                            { (pixiAppState !== 'running') && <div>Loading editor...</div> }
                        </div>                  
                        <BlueprintMenu 
                            gameComponents={bpStore.gameComponents}
                        />
                        </ContextMenu.Trigger>
                    </ContextMenu.Root>
                </Carousel>
                {selected?.style && <Visuals visuals={selected.style} onUpdate={updateVisuals} />}
                <SaveButton onClick={saveUpdate}/>
            </div>
    );
};

export default ComponentDesigner;
