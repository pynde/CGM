import { ACTION_TYPE_ENUM, GAME_COMPONENT_ENUM, GAME_STATE_ENUM, OWNER_TYPE_ENUM, RESOURCE_ENUM } from "@shared/enums/enums";
import { ActionType, CardType, GameComponent, GameState, OwnerArray, PlayerType, ResourceType } from "@shared/types/types";

type GameStateKey = keyof GameState


const resource: ResourceType = { type: RESOURCE_ENUM.MONEY, resource: { value: 1 }, amount: 10, id: '22asd' }
const action: ActionType = { type: ACTION_TYPE_ENUM.PAY_RESOURCE, automatic: false, id: '', ownerId: '' }
const players: PlayerType[] = [{ 
  name: "Joe",
  actions: [],
  id: 'INIT ID',
  type: OWNER_TYPE_ENUM.PLAYER
}];

const components : GameComponent<CardType>[] = [
  { 
      type: GAME_COMPONENT_ENUM.CARD, 
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

const owners: OwnerArray<PlayerType> = [
  [players[0].id, { resources: [resource], gameComponents: components, ...players[0] }]
];


const _GameState : GameState = {
    players: [{
        name: 'Testipelaaja',
        actions: [],
        id: '',
        type: OWNER_TYPE_ENUM.PLAYER
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


