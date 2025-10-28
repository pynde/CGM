import { GameStateContext } from '@root/src/context/GameStateContext';
import { ActionType } from '@shared/types/types';
import React, { FC, useContext, useEffect } from 'react';

export type ActionProps = ActionType & {
  
}

export const PlayerAction : FC<ActionProps> = (props: ActionProps) => {
  const { gameState, updateGS } = useContext(GameStateContext);
  useEffect(() => {
    
  }, [])

  return (
    <button onClick={() => updateGS(props)} className={"flex w-px[80] h-px[40] p-2 justify-center items-center bg-blue-900/50"}>
      { props.type }
    </button>
  );
};