import { ACTION_TYPE_ENUM, TYPE_ENUM, GAME_STATE_ENUM, OWNER_TYPE_ENUM, RESOURCE_ENUM } from "@shared/enums/enums";
import { ActionType, CardType, GameComponentType, GameState, OwnerArray, PlayerType, ResourceType } from "@shared/types/types";

type GameStateKey = keyof GameState


const resource: ResourceType = { type: TYPE_ENUM.RESOURCE, value: 1, amount: 10, id: '22asd', name: 'Money' }
const action: ActionType = { type: TYPE_ENUM.ACTION, automatic: false, id: '', ownerId: '', name: 'Pay Resource', actionPipe: [] }
const players: PlayerType[] = [{ 
  name: "Joe",
  actions: [],
  id: 'INIT ID',
  type: TYPE_ENUM.PLAYER
}];

const components : GameComponentType<CardType>[] = [
  { 
      type: TYPE_ENUM.GAME_COMPONENT, 
      name: 'TESTIKORTTI', 
      id: 'asd', 
      price: [resource], 
      actions: [action],
      ownerId: players[0].id,
      style: {
        width: 200,
        height: 300
      }
    } 
];

const owners: OwnerArray = [
  [players[0].id, { resources: [resource], gameComponents: components, ...players[0], type: TYPE_ENUM.OWNER }]
];


const _GameState : GameState = {
    players: [{
        name: 'Testipelaaja',
        actions: [],
        id: '',
        type: TYPE_ENUM.PLAYER
    }],
    owners: owners,
    selectedComponents: [],
    actions: [],
    activePlayer: "INIT GAME STATE",
    type: GAME_STATE_ENUM.GAME_STATE_TYPE,
    errors: []
}

// export const getGameState = () => {
//     return _GameState
// }

/** Update any field by passing a Partial GameState object */
// export const updateGameState = (gameState: GameState, updatedFieds: Partial<GameState>) : GameState => {
//     const entries = Object.entries(updatedFieds) as [GameStateKey, GameState[GameStateKey]][];
//     entries.forEach(([key, value]) => {
//         (gameState[key] as GameState[GameStateKey]) = value
//     })
//     return gameState
// }


