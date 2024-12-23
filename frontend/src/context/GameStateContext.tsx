import React, { useEffect, useState } from 'react';
import { ActionType, GameState, isTypeOf, Owner } from "@shared/types/types";
import { createContext, ReactNode, useReducer } from "react";
import { ActionReducer, useActions } from "../hooks/ActionHooks";
import { ACTION_TYPE_ENUM, SOCKET_RESPONSE } from "@shared/enums/enums";
import { socket } from '../App';


// Define the context type
export type GameStateContextType = {
    gameState: GameState | undefined;
    updateGS: (type: Partial<GameState> | ActionType) => void;
};


export const GameStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { actionReducer } = useActions();
	
    const [gameState, updateGameStateReact] = useReducer<ActionReducer>(actionReducer, undefined);
	
	const updateGS = (type: Partial<GameState> | ActionType)  => {
		if(isTypeOf<ActionType>(type, ACTION_TYPE_ENUM)) {
			updateGameStateReact(type);
		}
		else {
			updateGameStateReact({...type});
		}
	}

	useEffect(() => {
		const update = (gs: GameState) => { updateGS(gs); console.log('updatedGS from GSC', gs); };
		socket.on('gameState', update)
		return () => {
			socket.off('gameState', update)
		}
	  }, []);

	  useEffect(() => {
		socket.emit('getGameState', (gs, status) => {
			updateGS(gs);
		})	
	  }, [])

    return (
        <GameStateContext.Provider value={{ gameState, updateGS }}>
			{ gameState ? children : <div>Loading...</div> }
        </GameStateContext.Provider>
    );
};

export const GameStateContext = createContext<GameStateContextType>({ gameState: undefined, updateGS: () => {} });