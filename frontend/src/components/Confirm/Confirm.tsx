import { socket } from '@root/src/App';
import { GameStateContext } from '@root/src/context/GameStateContext';
import { useActions } from '@root/src/hooks/ActionHooks';
import { LOCALHOST_PORT, SOCKET_RESPONSE } from '@shared/enums/enums';
import { ClientToServerEvents, ServerToClientEvents } from '@shared/interfaces/socketEvents';
import React, { FC, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export interface Confirm {}

export const Confirm : FC<Confirm> = () => {

  const { gameState, updateGS} = useContext(GameStateContext);
  const { waitingToConfirm, setWaitingToConfirm } = useActions();
  const [highlight, setHighlight] = useState(' bg-green-900/25 ');
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if(gameState) {
      if(gameState.actions.length > 0) {
        setHighlight(' bg-green-800 ')
        setIsDisabled(false);
      }
      else {
        setHighlight(' bg-green-900/25 ')
        setIsDisabled(true);
      }
    } 
  }, [waitingToConfirm]);

  useEffect(() => {
    // if(!waitingToConfirm && gameState) {
    //   socket.emit('updateGameState', gameState, status => {
    //     if(status == SOCKET_RESPONSE.OK) {
    //       setWaitingToConfirm(false)
    //     }
    //   })
    // }
  }, [])
  
  const handleConfirm = () => {
    if(gameState) {
      const newOwners = gameState.owners.with(0, ['testi-iidee', { ...gameState.owners[0][1] }])
      socket.emit('updateOwners', newOwners, status => {
        if(status == SOCKET_RESPONSE.OK) {
          console.log('Owners emitted from Confirm: ', status);
        }
    });
    }
  }

  return (
    <button onClick={handleConfirm} disabled={isDisabled} className={`flex p-4 text-center justify-center items-center ${highlight}`}>
      Confirm
    </button>
  );
};