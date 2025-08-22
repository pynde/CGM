import { ACTION_TYPE_ENUM, GAME_COMPONENT_ENUM, RESOURCE_ENUM } from '@shared/enums/enums';
import { ActionType, GameComponentType, isTypeOf, ResourceType, VisualType } from '@shared/types/types';
import React, { useState, useEffect, useContext, useCallback } from 'react';
import Carousel from '../UI/Carousel';
import Visuals from '../Views/Visuals';
import { LookupContext } from '@root/src/context/LookupContext';
import { useBlueprint, useSetBlueprint } from '@root/src/zustand/BlueprintStore';
import GameComponent from '../GameComponent/GameComponent';
import { Layer, Stage, Transformer } from 'react-konva';
import * as ContextMenu from '@radix-ui/react-context-menu';
import BlueprintMenu from '../ContextMenu/BlueprintMenu';
import { BoxSelection } from '../UI/BoxSelection';
import { KonvaEventObject, NodeConfig } from 'konva/lib/Node';
import Konva from 'konva';



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
    const { selected, setSelected } = useContext(LookupContext);
    const [selectionRectStyle,setSelectionRectStyle] = useState<NodeConfig | undefined>(undefined);
    const startingPoint = React.useRef<{ x: number; y: number } | null>(null);
    const konvaRef = React.useRef<Konva.Group>(null);
    const transformerRef = React.useRef<Konva.Transformer>(null);

        const handleStageMouseDown = (event: KonvaEventObject<MouseEvent>) => {
            const relativePointerPosition = event.currentTarget.getRelativePointerPosition();
            // Logic to start box selection
             if(!startingPoint.current && relativePointerPosition) {
                startingPoint.current = relativePointerPosition
             }
        };
    
        const handleStageMouseMove = (event: KonvaEventObject<MouseEvent>) => {
            const relativePointerPosition = event.currentTarget.getRelativePointerPosition();
            if (!startingPoint.current || !relativePointerPosition) return;
            const { startX, startY } = { startX: startingPoint.current.x, startY: startingPoint.current.y };
            const { minX, minY } = { 
                minX: Math.min(relativePointerPosition.x, startX), 
                minY: Math.min(relativePointerPosition.y, startY),
            };
            setSelectionRectStyle((prevStyle) => ({
                ...prevStyle,
                x: minX,
                y: minY,
                width: Math.abs(relativePointerPosition.x - startX),
                height: Math.abs(relativePointerPosition.y - startY),
            }));
            
        }
    
        const handleStageMouseUp = (event: KonvaEventObject<MouseEvent>) => {
            startingPoint.current = null;
            setSelectionRectStyle(undefined);
        };


    useEffect(() => {
        if(bpStore.gameComponents[0]) setSelected({ ...selected, selectedComponent: bpStore.gameComponents[0][1] });
    }, [bpStore])


const setSelectedComponent = (index: number) => {
    if (bpStore.gameComponents[index]) {
        setSelected({ ...selected, selectedComponent: bpStore.gameComponents[index][1] });
    }
}

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

    
    const updateSelectedComponent = () => {
        if(!selected.selectedComponent) return;
        bpStore.gameComponents
    }


    return (
            <div className="component-builder flex flex-row mx-auto h-full space-x-2">
                <Carousel title={selected.selectedComponent?.name} className='h-full' arrayLength={bpStore.gameComponents.length} setIndex={(index) => setSelectedComponent(index)}>
                    <ContextMenu.Root modal={true}>
                    <ContextMenu.Trigger>
                        <Stage 
                            style={{backgroundColor: 'chocolate'}}
                            width={selected.selectedComponent?.style?.width} height={selected.selectedComponent?.style?.height} 
                            onMouseDown={handleStageMouseDown} 
                            onMouseMove={handleStageMouseMove} 
                            onMouseUp={handleStageMouseUp}
                            
                            >
                            
                            <Layer>
                            { selected.selectedComponent && isTypeOf<GameComponentType>(selected.selectedComponent, GAME_COMPONENT_ENUM) &&
                                <GameComponent
                                    {...selected.selectedComponent}
                                    showTitle={true}
                                    konvaRef={konvaRef}
                                    style={{
                                        ...selected.selectedComponent.style,
                                        width: selected.selectedComponent.style?.width,
                                        height: selected.selectedComponent.style?.height,
                                        x: 0,
                                        y: 0
                                    }}
                                    renderAs='konva'
                                />
                            }
                            <BoxSelection
                                renderAs='konva'
                                useBoxSelection={true}
                                rectStyle={
                                    {
                                        ...selectionRectStyle
                                    }
                                }
                                
                            />
                            <Transformer/>
                            </Layer>
                        </Stage>                        
                        <BlueprintMenu 
                            gameComponents={bpStore.gameComponents}
                        />
                        </ContextMenu.Trigger>
                    </ContextMenu.Root>
                </Carousel>
                {selected?.selectedComponent?.style && <Visuals item={selected.selectedComponent.style} onUpdate={updateVisuals} />}
            </div>
    );
};

export default ComponentBuilder;
