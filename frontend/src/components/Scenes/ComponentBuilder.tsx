import { ACTION_TYPE_ENUM, RESOURCE_ENUM, TYPE_ENUM } from '@shared/enums/enums';
import { ActionType, BaseType, GameComponentType, isTypeOf, ResourceType, SelectionType, VisualType } from '@shared/types/types';
import React, { useState, useEffect, useContext, RefObject } from 'react';
import Carousel from '../UI/Carousel';
import Visuals from '../Views/Visuals';
import { useSetBlueprint, useShallowBlueprint, useUpdateBlueprintGameComponents } from '@root/src/zustand/BlueprintStore';
import GameComponent from '../GameComponent/GameComponent';
import { Layer, Stage, Transformer } from 'react-konva';
import * as ContextMenu from '@radix-ui/react-context-menu';
import BlueprintMenu from '../ContextMenu/BlueprintMenu';
import { BoxSelection } from '../UI/BoxSelection';
import { KonvaEventObject, NodeConfig } from 'konva/lib/Node';
import Konva from 'konva';
import SaveButton from '../UI/SaveButton';
import { SelectionItem, setSelectionStore, useSelection } from '@root/src/zustand/SelectionStore';

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
    const setGameComponent = useUpdateBlueprintGameComponents
    const bpStore = useShallowBlueprint();
    const selected = useSelection();
    const [selectionRectStyle,setSelectionRectStyle] = useState<NodeConfig | undefined>(undefined);
    const startingPoint = React.useRef<{ x: number; y: number } | null>(null);
    const konvaRef = React.useRef<Konva.Group>(null);
    const divRef = React.useRef<HTMLDivElement>(null);
    const transformerRef = React.useRef<Konva.Transformer>(null);
    
    // Ensure the transformer is attached to the selected node
    useEffect(() => {
        const node = konvaRef.current;
        node && transformerRef.current?.nodes([node]);
    }, [selected])

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


    const setSelectedComponent = (index: number) => {
        if (bpStore.gameComponents[index]) {
            setSelectionStore(bpStore.gameComponents[index][1]);
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
        setSelectionStore(updatedComponent);
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

    const handleTransformEnd = (e: Konva.KonvaEventObject<Event>) => {
        if(!konvaRef || !konvaRef.current || !selected) return;
        const node = konvaRef.current;
        const scaleX = node.scaleX();
        const scaleY = node.scaleY();
        node.scaleX(1);
        node.scaleY(1);

        updateSelectedComponent({
            ...selected,
            style: {
                ...selected.style,
                x: node.x(),
                y: node.y(),
                width: Math.max(5, node.width() * scaleX),
                height: Math.max(5, node.height() * scaleY)
            }
        })
    }


    return (
            <div className="component-builder flex flex-row mx-auto h-full space-x-2">
                <Carousel 
                    title={selected?.name} 
                    className='h-full' 
                    arrayLength={bpStore.gameComponents.length} 
                    onNextOrPrevious={(index) => setSelectedComponent(index)}>
                    <ContextMenu.Root modal={true}>
                    <ContextMenu.Trigger>                    
                        <Stage 
                            style={{backgroundColor: 'chocolate'}}
                            width={(selected?.style?.width || 0) + 10} height={(selected?.style?.height || 0) + 10} 
                            onMouseDown={handleStageMouseDown} 
                            onMouseMove={handleStageMouseMove} 
                            onMouseUp={handleStageMouseUp}
                            >
                            <Layer>
                            
                            { selected && isTypeOf<GameComponentType>(selected, TYPE_ENUM.GAME_COMPONENT) &&
                                <GameComponent
                                    {...selected}
                                    showTitle={true}
                                    renderAs='konva'
                                    ref={konvaRef}
                                    handleTransformEnd={handleTransformEnd}
                                    style={{
                                        ...selected.style,
                                        width: selected.style?.width,
                                        height: selected.style?.height,
                                        x: 0,
                                        y: 0
                                    }}
                                    
                                />
                                
                            }
                            <Transformer ref={transformerRef} />
                            <BoxSelection
                                renderAs='konva'
                                useBoxSelection={true}
                                rectStyle={
                                    {
                                        ...selectionRectStyle
                                    }
                                }
                                
                            />
                            </Layer>
                        </Stage>                        
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
