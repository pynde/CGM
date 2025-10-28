import { useBlueprint, useSetBlueprint } from '@root/src/zustand/BlueprintStore';
import { setSelection } from '@root/src/zustand/SelectionStore';
import { SOCKET_RESPONSE } from '@shared/enums/enums';
import { BlueprintType } from '@shared/types/types';
import React, { FC, ReactNode, useEffect } from 'react';
import HierarchyView from '../HierarchyView/HierarchyView';
import SceneNavigation from '../Scenes/SceneNavigation';


interface MainProps {
  children?: ReactNode
}

const Main : FC<MainProps> = ({ children }) => {

  useEffect(() => {
  }, []);

  return (
    <div className='w-full h-full'>
        <div className='flex w-full h-full'>
          <SceneNavigation/>
        </div>
    </div>
    
  );
};

export default Main;