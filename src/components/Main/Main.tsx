import React, { FC, ReactNode, useEffect } from 'react';
import SceneNavigation from '../Scenes/SceneNavigation';
import HierarchyView from '../HierarchyView/HierarchyView';
import { BlueprintType } from '@shared/types/types';
import { socket } from '@root/src/App';
import { useBlueprint, useSetBlueprint } from '@root/src/zustand/BlueprintStore';
import { SOCKET_RESPONSE } from '@shared/enums/enums';
import { setSelection } from '@root/src/zustand/SelectionStore';


interface MainProps {
  children?: ReactNode
}

const updateBp = (partialBp: Partial<BlueprintType>) => {
	useSetBlueprint(partialBp);
}


const Main : FC<MainProps> = ({ children }) => {
  const bpStore = useBlueprint(); 

  useEffect(() => {
      if(bpStore) {
        socket.emit('getBlueprint', (bp, status) => {
          if(status == SOCKET_RESPONSE.OK) {
            updateBp(bp);
            setSelection(bp.gameComponents[0]?.[1]);
          } 
        });
      }
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