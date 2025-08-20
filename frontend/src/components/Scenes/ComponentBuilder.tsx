import { ACTION_TYPE_ENUM, GAME_COMPONENT_ENUM, RESOURCE_ENUM } from '@shared/enums/enums';
import { ActionType, GameComponentType, isTypeOf, ResourceType, VisualType } from '@shared/types/types';
import React, { useState, useEffect, useContext, useCallback } from 'react';
import Carousel from '../UI/Carousel';
import Visuals from '../Views/Visuals';
import { LookupContext } from '@root/src/context/LookupContext';
import { useBlueprint, useSetBlueprint } from '@root/src/zustand/BlueprintStore';
import GameComponent from '../GameComponent/GameComponent';
import { Layer, Stage } from 'react-konva';
import { centerElement } from '@root/src/util/dimensions';
import * as ContextMenu from '@radix-ui/react-context-menu';
import ActionEffectMenu from '../ContextMenu/BlueprintMenu';
import BlueprintMenu from '../ContextMenu/BlueprintMenu';


// Props interface for the ComponentBuilder
interface ComponentBuilderProps {

}


// TODO Change BlueprintContext to use Zustand store
export const ComponentBuilder: React.FC<ComponentBuilderProps> = () => {

    const stageDimensions = {
        width: 800,
        height: 600
    }
    const [itemIndex, setItemIndex] = useState<number>(0);
    const setBlueprint = useSetBlueprint; 
    const bpStore = useBlueprint();
    const { selected, updateSelected } = useContext(LookupContext);


    useEffect(() => {
        if(bpStore.gameComponents[0]) updateSelected({ ...selected, selectedComponent: bpStore.gameComponents[0][1] });
    }, [bpStore])


const setSelectedComponent = (index: number) => {
    if (bpStore.gameComponents[index]) {
        updateSelected({ ...selected, selectedComponent: bpStore.gameComponents[index][1] });
    }
}

const getItemsAsJSX = useCallback(() => {
        const items: JSX.Element[] = [];
        bpStore.gameComponents.forEach(([key, value]) => {
            if(isTypeOf<GameComponentType>(value, GAME_COMPONENT_ENUM)) {
                items.push(<GameComponent 
                    {...value} 
                    showTitle={true} 
                    renderAs='konva' 
                    style={{
                        ...value.style, 
                        ...centerElement(stageDimensions.width, stageDimensions.height, value.style?.width || 0, value.style?.height || 0) }}  
                    />);
            }
        });
        // bpStore.resources.forEach(([key, value]) => {
        //     if(isTypeOf<ResourceType>(value, RESOURCE_ENUM)) {
        //         items.push(<Resource {...value}/>);
        //     }
        // });
        console.log('items', items);
        return items;
    }, [bpStore.gameComponents]);

    const updateVisuals = (updatedItem: Partial<VisualType>) => {
        if(isTypeOf<GameComponentType>(selected, GAME_COMPONENT_ENUM)) {
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
        }if(isTypeOf<ActionType>(selected, ACTION_TYPE_ENUM)) {
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


    return (
            <div className="component-builder flex flex-row mx-auto h-full space-x-2">
                <Carousel title={selected.selectedComponent?.name} className='h-full' arrayLength={getItemsAsJSX().length} setIndex={(index) => setSelectedComponent(index)}>
                    <ContextMenu.Root modal={true}>
                    <ContextMenu.Trigger>
                        <Stage width={800} height={600}>
                            <Layer>
                            { selected.selectedComponent && isTypeOf<GameComponentType>(selected.selectedComponent, GAME_COMPONENT_ENUM) &&
                                <GameComponent
                                    {...selected.selectedComponent}
                                    showTitle={true}
                                    style={{
                                        ...selected.selectedComponent.style,
                                        ...centerElement(stageDimensions.width, stageDimensions.height, selected.selectedComponent.style?.width || 0, selected.selectedComponent.style?.height || 0)
                                    }}
                                    renderAs='konva'
                                />
                        }
                            </Layer>
                        </Stage>
                        </ContextMenu.Trigger>
                        <BlueprintMenu 
                            gameComponents={bpStore.gameComponents}
                        />
                    </ContextMenu.Root>
                </Carousel>
                {selected?.selectedComponent?.style && <Visuals item={selected.selectedComponent.style} onUpdate={updateVisuals} />}
            </div>
    );
};

export default ComponentBuilder;
