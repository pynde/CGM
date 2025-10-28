import useGameComponent from '@root/src/hooks/GameComponentHooks';
import { useVisuals } from '@root/src/hooks/VisualsHooks';
import { GameComponent, MeepleType } from '@shared/types/types';
import React, { FC } from 'react';

type MeepleProps = GameComponent<MeepleType> & {

}

export const Meeple : FC<MeepleProps> = (props) => {
  const GCMeeple = useGameComponent(props);
  const styledMeeple = useVisuals(props.style);

  const handleClick = () => {
    GCMeeple.selectComponent(GCMeeple.component);
  }

  return (
    <div 
      onClick={handleClick} 
      className={`w-[${props.style.width}px] h-[${props.style.height}px] justify-center items-center bg-yellow-700/90 ${GCMeeple.getGCStyle}`}
      style={{ width: styledMeeple.resize(props.style.width, 300), height: styledMeeple.resize(props.style.height, 300) }}
      >
      Meeple
    </div>
  );
};