import React, { FC, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import ItemDetails from '../UI/ItemDetails';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import CollapsibleList from '../UI/CollabsibleList';
import { ActionType, GameComponentType, isTypeOf, ResourceType } from '@shared/types/types';
import { TYPE_ENUM, RESOURCE_ENUM } from '@shared/enums/enums';
import { useBlueprint } from '@root/src/zustand/BlueprintStore';
import {   useSelection, setSelectionItem } from '@root/src/zustand/SelectionStore';

interface HierarchyViewProps {

}

const HierarchyView : FC<HierarchyViewProps> = () => {
  const bpStore = useBlueprint();
  const selected = useSelection();

  const [active, setActive] = useState(false);

  const updateSelected = (value: any) => {
    console.log('value', value);
    if(isTypeOf<GameComponentType>(value, TYPE_ENUM.GAME_COMPONENT)) {
      const gcMap = new Map(bpStore.gameComponents);
      const item = gcMap.get(value.id);
      if(item) setSelectionItem(value)
    }
    if(isTypeOf<ResourceType>(value, TYPE_ENUM.RESOURCE)) {
      const rMap = new Map(bpStore.resources);
      const item = rMap.get(value.id);
      if(item) setSelectionItem(value);
    }
  }

  const getItemDetailsByType = useCallback((items: any[], type: string) => {
    return items.map(([key, value], index) => {
      if(value.type == type) return (
        <ItemDetails 
          className={clsx(selected?.id === value.id && 'text-actioncolor' ,'p-2')}  
          onClick={() => updateSelected(value)} 
          key={key + index} 
          item={value} 
          includeKeys={['name']}
        />
      )
      else return null;
    })
  }, [bpStore, selected]);
  

  return (
    <div className='h-full p-4 flex flex-col right-0 md:min-w-64 lg:min-w-80 dark:bg-darkbglighter dark:text-darktext'>
        <h1 className='text-2xl font-bold m-2'>Hierarchy</h1>
        <Accordion.Root type="single" defaultValue='gameComponents' collapsible className="w-full">
          <Accordion.Item value="gameComponents" className="p-1 px-4 w-full bg-gray-500/50 rounded-md transition-all">
            <Accordion.Header>
              <Accordion.Trigger className="group flex flex-row justify-between items-center w-full h-10">
              Game Components<ChevronRightIcon className="w-6 group-data-[state=open]:rotate-90" />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>
            <CollapsibleList label={'Game Components'}>
              { bpStore.gameComponents.map(([key, item], index) =>
                 <ItemDetails 
                  key={item.name+index} 
                  item={item} 
                  includeKeys={['name']} 
                  onClick={() => updateSelected(item)}
                  className={clsx(selected?.id === item.id && 'text-actioncolor' ,'p-2')}  
                />
                ) 
              }
            </CollapsibleList>
            
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
    </div>
  );
};

export default HierarchyView;