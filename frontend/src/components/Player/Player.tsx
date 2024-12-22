import React, { FC, useEffect, useMemo } from 'react';
import {Owner, PlayerType} from '@shared/types/types';
import GameComponent from '../GameComponent/GameComponent';


interface PlayerProps extends Owner<PlayerType> {

}

export const isPlayer = (x: any) : x is PlayerType => {
  return x
}

export const Player : FC<PlayerProps> = (props: PlayerProps) => {

  useEffect(() => {
    
  }, []);


  return (
    <div className={"flex w-full h-full justify-center items-center bg-stone-900/25"}>
      { props.gameComponents.map(component => <GameComponent {...component}/>) }
    </div>
  );
};