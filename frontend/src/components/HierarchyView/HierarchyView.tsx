import { BlueprintContext } from '@root/src/context/BlueprintContext';
import React, { FC, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import ItemDetails from '../UI/ItemDetails';
import { LookupContext } from '@root/src/context/LookupContext';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import CollapsibleList from './CollabsibleList';
import { ActionType, GameComponentType, isTypeOf, ResourceType } from '@shared/types/types';
import { GAME_COMPONENT_ENUM, RESOURCE_ENUM } from '@shared/enums/enums';

interface HierarchyViewProps {

}

const HierarchyView : FC<HierarchyViewProps> = () => {
  const { blueprint } = useContext(BlueprintContext);
  const {gameComponentTypes, resourceTypes, actionTypes, selected, updateSelected} = useContext(LookupContext);
  const [active, setActive] = useState(false);

  const setSelected = (value: any) => {
    console.log('value', value);
    if(isTypeOf<GameComponentType>(value, GAME_COMPONENT_ENUM)) {
      const gcMap = new Map(blueprint.gameComponents);
      const item = gcMap.get(value.id);
      if(item) updateSelected({ ...selected, selectedComponent: item })
    }
    if(isTypeOf<ResourceType>(value, RESOURCE_ENUM)) {
      const rMap = new Map(blueprint.resources);
      const item = rMap.get(value.id);
      if(item) updateSelected({ ...selected, selectedResource: item });
    }
  }

  const getItemDetailsByType = useCallback((items: any[], type: string) => {
    return items.map(([key, value], index) => {
      if(value.type == type) return (
        <ItemDetails 
          className={clsx(index%2==0 && 'bg-white/20 p-2')}  
          onClick={() => setSelected(value)} 
          key={key + index} 
          item={value} 
          includeKeys={['name']}
        />
      )
      else return null;
    })
  }, [blueprint, selected]);
  

  return (
    <div className='h-full p-4 flex flex-col right-0 md:min-w-64 lg:min-w-80 dark:bg-darkbglighter dark:text-darktext'>
        <h1 className='text-2xl font-bold m-2'>Hierarchy</h1>
        <Accordion.Root type="single" collapsible className="w-full">
          <Accordion.Item value="gameComponents" className="p-1 px-4 w-full bg-gray-500/50 rounded-md transition-all">
            <Accordion.Header>
              <Accordion.Trigger className="group flex flex-row justify-between items-center w-full h-10">
          Game Components<ChevronRightIcon className="w-6 group-data-[state=open]:rotate-90" />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>
              {gameComponentTypes.map(item => (
          <CollapsibleList key={item} label={item}>
            { getItemDetailsByType(blueprint.gameComponents, item) }
          </CollapsibleList>
              ))}
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
    </div>
  );
};

export default HierarchyView;