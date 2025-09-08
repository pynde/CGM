import { ACTION_TYPE_ENUM, RESOURCE_ENUM, TYPE_ENUM } from '@shared/enums/enums';
import { ActionType, BaseType, GameComponentType, isTypeOf, ResourceType, SelectionType, VisualType } from '@shared/types/types';
import React, { useState, useEffect, useContext, RefObject } from 'react';
import Carousel from '../UI/Carousel';
import Visuals from '../Views/Visuals';
import { useSetBlueprint, useShallowBlueprint, useUpdateBlueprintGameComponents } from '@root/src/zustand/BlueprintStore';
import * as ContextMenu from '@radix-ui/react-context-menu';
import BlueprintMenu from '../BlueprintMenu/BlueprintMenu';
import SaveButton from '../UI/SaveButton';
import { SelectionItem, setSelectionItem, useSelection } from '@root/src/zustand/SelectionStore';
import { Graphics, Application, Ticker } from 'pixi.js';
import "@pixi/layout";
import { createPixiComponent, createPixiLabelFromBaseType, createTransformer, PIXI_COMPONENTS } from '../PixiComponents/PixiVanilla';
import { destroyPixiApp, initPixiApp, setPixiApp, usePixiApp } from '@root/src/zustand/PixiStore';
// Props interface for the ComponentBuilder
interface ComponentBuilderProps {
    
}

// TODO Change BlueprintContext to use Zustand store
export const ComponentBuilder: React.FC<ComponentBuilderProps> = () => {
    const setBlueprint = useSetBlueprint; 
    const setGameComponent = useUpdateBlueprintGameComponents
    const bpStore = useShallowBlueprint();
    const selected = useSelection();
    const pixiRootDiv = React.useRef<HTMLDivElement>(null);
    const pixiApp = usePixiApp();
    
    useEffect(() => {
        console.log('Pixi app changed', pixiApp);
        // Init Pixi App and add to div container
        (async () => {
            if(pixiRootDiv.current) {
                await initPixiApp(pixiRootDiv.current);
                if(pixiApp) pixiRootDiv.current.appendChild(pixiApp.canvas);          
            }
        })();
        return () => {
            if(pixiApp && pixiRootDiv.current) destroyPixiApp(); console.log('Destroyed Pixi app');

        }
    }, [pixiApp]);

    useEffect(() => {
        const ticker = new Ticker();
        // Add selected component to Pixi stage
        if (isTypeOf<GameComponentType>(selected, TYPE_ENUM.GAME_COMPONENT)) {
            if(!pixiApp) return;
            const label = createPixiLabelFromBaseType(selected, PIXI_COMPONENTS.CONTAINER);
            const oldPixiGameComponent = pixiApp.stage.getChildByLabel(label, false);
            if(oldPixiGameComponent) oldPixiGameComponent.destroy();
            
            const newPixiGameComponent = createPixiComponent({
                id: selected.id,
                name: selected.name,
                type: selected.type,
                ...selected.style
            });
            pixiApp.renderer.layout.update(newPixiGameComponent.container);
            ticker.addOnce(() => {
              const pixiTransformer = createTransformer(newPixiGameComponent.container, pixiApp);  
              pixiApp.stage.addChild(...pixiTransformer);
            }).start();
            pixiApp.stage.addChild(newPixiGameComponent.container);
            
        }
        return () => {
            pixiApp?.stage.removeChildren();
            ticker.destroy();
        }
    }, [selected?.id])



    const setSelectedComponent = (index: number) => {
        if (bpStore.gameComponents[index]) {
            setSelectionItem(bpStore.gameComponents[index][1]);
        }
    }

    const updateVisuals = (updatedItem: Partial<VisualType>) => {
        if(isTypeOf<GameComponentType>(selected, TYPE_ENUM.GAME_COMPONENT)) {
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
        setSelectionItem(updatedComponent);
    }

    const saveUpdate = () => {
        if(!selected) return;
        const newGCArray = bpStore.gameComponents.map(([key, value]) => {
            if(value.id === selected?.id) {
                return [key, selected] as [string, GameComponentType];
            }
            return [key, value] as [string, GameComponentType];
        });
        setGameComponent(newGCArray);
    }

    return (
            <div className="component-builder flex flex-row mx-auto h-full space-x-2" style={{width: '100%', height: '100%'}}>
                <Carousel 
                    title={selected?.name} 
                    className='h-full' 
                    arrayLength={bpStore.gameComponents.length} 
                    onNextOrPrevious={(index) => setSelectedComponent(index)}>
                    <ContextMenu.Root modal={true}>
                    <ContextMenu.Trigger>
                        <div className='container w-[500px] h-[500px]' ref={pixiRootDiv}/>                   
                        <BlueprintMenu 
                            gameComponents={bpStore.gameComponents}
                        />
                        </ContextMenu.Trigger>
                    </ContextMenu.Root>
                </Carousel>
                {selected?.style && <Visuals item={selected.style} onUpdate={updateVisuals} />}
                <SaveButton onClick={saveUpdate}/>
            </div>
    );
};

export default ComponentBuilder;
