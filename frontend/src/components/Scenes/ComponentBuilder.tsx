import { BlueprintContext } from '@root/src/context/BlueprintContext';
import { ACTION_TYPE_ENUM, GAME_COMPONENT_ENUM, RESOURCE_ENUM, SOCKET_RESPONSE } from '@shared/enums/enums';
import { ActionType, CardType, GameComponentType, isTypeOf, MeepleType, ResourceType, VisualType } from '@shared/types/types';
import React, { useState, useEffect, useContext } from 'react';
import { Card } from '../Card/Card';
import { Meeple } from '../Meeple/Meeple';
import Carousel from '../UI/Carousel';
import Visuals from '../Views/Visuals';
import { LookupContext } from '@root/src/context/LookupContext';
import Resource from '../Resource/Resource';
import { Action } from '../Actions/Action';


// Props interface for the ComponentBuilder
interface ComponentBuilderProps {

}

export const ComponentBuilder: React.FC<ComponentBuilderProps> = () => {

    const [componentToEdit, setComponentToEdit] = useState<string | null>(null);

    const { blueprint, updateBlueprint } = useContext(BlueprintContext);
    const { selected, updateSelected } = useContext(LookupContext);


    useEffect(() => {
        if(blueprint.gameComponents[0]) updateSelected({ ...selected, selectedComponent: blueprint.gameComponents[0][1] });
    }, [blueprint])


const getSelectedItem = () => {
        if(!selected) return <div>Select an item from the <code>Hierarchy view</code></div>;
        if(isTypeOf<GameComponentType>(selected, GAME_COMPONENT_ENUM)) {
            if(isTypeOf<CardType>(selected, GAME_COMPONENT_ENUM.CARD)) {
                return <Card {...selected} />;
            }
            if(isTypeOf<MeepleType>(selected, GAME_COMPONENT_ENUM.MEEPLE)) {
                    return <Meeple {...selected} />;
            }
        }
        if(isTypeOf<ResourceType>(selected, RESOURCE_ENUM)) {
                return <Resource {...selected}/>;
        }
        if(isTypeOf<ActionType>(selected, ACTION_TYPE_ENUM)) {
            return <Action { ...selected}/>
        }
        return <div>Select an item from the <code>Hierarchy view</code></div>;
}


    const getGameComponents = () => { 
        return blueprint.gameComponents.map(([, item], index) => {
            if(isTypeOf<CardType>(item, GAME_COMPONENT_ENUM.CARD)) {
                return <Card {...item} key={index} />
            }
            if(isTypeOf<MeepleType>(item, GAME_COMPONENT_ENUM.MEEPLE)) {
                return <Meeple {...item} key={index} />
            }
            else return null
        })
     };

    const updateVisuals = (updatedItem: Partial<VisualType>) => {
        if(isTypeOf<GameComponentType>(selected, GAME_COMPONENT_ENUM)) {
            const updatedComponent = {
            ...selected,
            style: {
                ...selected.style,
                ...updatedItem
            }
            };
            const gcMap = new Map(blueprint.gameComponents);
            gcMap.set(selected.id, updatedComponent);
            
            updateBlueprint({
            ...blueprint,
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
                const rMap = new Map(blueprint.resources);
                rMap.set(selected.id, updatedResource);
                
                updateBlueprint({
                ...blueprint,
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
                const aMap = new Map(blueprint.actions);
                aMap.set(selected.id, updatedAction);
                
                updateBlueprint({
                ...blueprint,
                actions: Array.from(aMap.entries())
                });
            }
        }
    }


    return (
            <div className="component-builder flex flex-row mx-auto h-full space-x-2">
                <Carousel className='h-full' items={[getSelectedItem()]}/>
                {selected?.selectedComponent?.style && <Visuals item={selected.selectedComponent?.style} onUpdate={updateVisuals} />}
            </div>
    );
};

export default ComponentBuilder;
