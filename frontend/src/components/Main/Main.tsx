import React, { FC, ReactNode, useEffect, useState } from 'react';
import SceneNavigation from '../Scenes/SceneNavigation';
import HierarchyView from '../HierarchyView/HierarchyView';
import { BlueprintType } from '@shared/types/types';
import { socket } from '@root/src/App';
import { LookupContext, LookupProvider } from '@root/src/context/LookupContext';
import { useBlueprint, useSetBlueprint } from '@root/src/zustand/BlueprintStore';


interface MainProps {
  children?: ReactNode
}


const Main : FC<MainProps> = ({ children }) => {
  const bpStore = useBlueprint();
  const setBlueprint = useSetBlueprint;
  useEffect(() => {
    const update = (bp: BlueprintType) => { setBlueprint(bp) };
    socket.on('blueprint', update);
    return () => {
        socket.off('blueprint', update);
    }
}, []);

  return (
    <div className='w-full h-full'>
        <LookupProvider>
        <div className='flex h-full'>
          <SceneNavigation/>
          <HierarchyView/>
        </div>
        { children }
        </LookupProvider>
      
    </div>
    
  );
};

export default Main;