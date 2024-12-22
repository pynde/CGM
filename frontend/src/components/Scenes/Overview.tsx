import React, { FC, useContext, useEffect, useMemo, useState } from 'react';
import { Confirm } from '../Confirm/Confirm';
import { ACTION_TYPE_ENUM, LOCALHOST_PORT, OWNER_TYPE_ENUM } from '@shared/enums/enums';
import { ActionType, isTypeOf, OwnerArray, PlayerType } from '@shared/types/types';
import { GameStateContext, GameStateProvider } from '@root/src/context/GameStateContext';
import { useOwner } from '@root/src/hooks/OwnerHooks';
import { Player } from '../Player/Player';
import { socket } from '@root/src/App';
import Action from '../Actions/Action';


interface OverviewProps {}

const Overview : FC<OverviewProps> = () => {

  const { gameState, updateGS } = useContext(GameStateContext);
  const { getOwnersByType } = useOwner();
  const [players, setPlayers] = useState<OwnerArray<PlayerType>>([]);
  

  useEffect(() => {
    if(gameState) {
      const playerOwners = getOwnersByType<PlayerType>(gameState, OWNER_TYPE_ENUM.PLAYER);
      setPlayers(playerOwners);
    }
  }, [gameState])


  const actions = useMemo<ActionType<unknown>[]>((): ActionType<unknown>[] => {
    if(gameState) {
      return gameState.actions
    }
    return []
  }, [gameState])



  return (

      <div className={"flex justify-between gap-x-4 w-full h-full items-center bg-stone-900/25"}>
        { players.map(([, item], index) => <Player key={'ovplayer'+index} {...item}/>) }
        { actions.map((item, index) => { 
            return <Action key={'ovaction'+index} {...item}/>
          }) 
        } 
        <Confirm/>
      </div>

  );
};

export default Overview;