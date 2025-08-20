import React, { useContext, useEffect, useState } from 'react';
import { ActionArray, GameComponentType, GameState, isTypeOf, TailwindCSS } from '@shared/types/types'
import { ACTION_TYPE_ENUM, GAME_COMPONENT_ENUM, SOCKET_RESPONSE } from '@shared/enums/enums';
import { ActionType, MeepleType, CardType } from '@shared/types/types'
import { GameStateContext } from '../context/GameStateContext';
import { socket } from '../App';
import Action from '../components/Actions/Action';
import { useBlueprint } from '../zustand/BlueprintStore';



// Custom hook for using a Game Component
const useGameComponent = (component: GameComponentType) => {
  const { gameState, updateGS } = useContext(GameStateContext);
  const bpStore = useBlueprint();
  const [selectedState, setSelectedState] = useState(false);
  const getGCStyle : TailwindCSS = selectedState ? ' outline outline-4 outline-white ' : '';

  useEffect(() => {
    console.log('GS COMPONENT MOUNTED', component.type);
    
  }, []);

  const activateAvailableActions = (c: GameComponentType) : React.JSX.Element[] =>  {
    return c.actions.map(action => {
          return <Action {...action} />
    })
  }

  const getComponentByType = (component: GameComponentType) => {
      switch(true) {
        case isTypeOf<CardType>(component, GAME_COMPONENT_ENUM.CARD): return component;
        case isTypeOf<MeepleType>(component, GAME_COMPONENT_ENUM.MEEPLE): return component;
        default: return null
      }
    }
  

  const selectComponent = (component: GameComponentType) => {
    if(gameState) {
      let isSelected: boolean;
      const selectedArray = [...gameState.selectedComponents];
      const index = gameState.selectedComponents.findIndex(([,value]) => value.id === component.id);
      const selectedComponent = gameState.selectedComponents[index];
      let newActions: ActionArray = [];
      if(selectedComponent) {
        newActions = gameState.actions.filter(action => 
          !(action.ownerId == component.id)
        );
        selectedArray.splice(index, 1);
        isSelected = false;
        console.log('poistan');
      }
      else {
        console.log('lisään');
        selectedArray.push([component.id, component]);
        newActions = gameState.actions.concat(component.actions);
        isSelected = true;
      }
      console.log('new actions:', newActions);
      console.log('selectedArray', selectedArray);
      socket.emit('updateGameState', { ...gameState, selectedComponents: selectedArray, actions: newActions }, status => {      
        if(status == SOCKET_RESPONSE.OK) {
          setSelectedState(isSelected)
        }
      });
    }
    if(bpStore) {
      setSelectedState(!selectedState);
    }
  };

  return {
    component,
    selectComponent,
    getComponentByType,
    getGCStyle,
    activateAvailableActions,
    selectedState,
  };
};

export default useGameComponent;