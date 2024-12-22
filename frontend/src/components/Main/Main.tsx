import React, { FC, ReactNode, useEffect, useState } from 'react';
import SceneNavigation from '../Scenes/SceneNavigation';
import HierarchyView from '../HierarchyView/HierarchyView';
import { BlueprintContext as BPC, BlueprintContextType } from '@root/src/context/BlueprintContext';
import { BlueprintType } from '@shared/types/types';
import { socket } from '@root/src/App';
import { LookupContext, LookupProvider } from '@root/src/context/LookupContext';


interface MainProps {
  children?: ReactNode
}

const BlueprintContext = BPC;

const Main : FC<MainProps> = ({ children }) => {
  const [blueprint, updateBP] = useState<BlueprintType>({  
    gameComponents: [],
    resources: [],
    actions: [],
  });
  useEffect(() => {
    const update = (bp: BlueprintType) => { updateBlueprint(bp) };
    
    socket.on('blueprint', update);
    return () => {
        socket.off('blueprint', update);
    }
}, []);

const updateBlueprint = (bp: Partial<BlueprintType>) => {
    updateBP({ ...blueprint, ...bp });  
};

  return (
    
    <div className='w-full h-full'>
      <BlueprintContext.Provider value={{ blueprint: blueprint, updateBlueprint: updateBlueprint }}>
        <LookupProvider>
        <div className='flex h-full'>
          <SceneNavigation/>
          <HierarchyView/>
        </div>
        { children }
        </LookupProvider>
      </BlueprintContext.Provider>
      
    </div>
    
  );
};

export default Main;