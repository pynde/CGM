import { ACTION_TYPE_ENUM, TYPE_ENUM, GAME_STATE_ENUM, OWNER_TYPE_ENUM, RESOURCE_ENUM } from "@shared/enums/enums";
import { ActionType, BlueprintType, CardType, GameComponentType, OwnerArray, PlayerType, ResourceType } from "@shared/types/types";



const resource: ResourceType = { type: TYPE_ENUM.RESOURCE, value: 1, amount: 10, id: '22asd', name: 'Money' }
const action: ActionType = { type: TYPE_ENUM.ACTION, automatic: false, id: '', ownerId: '', name: 'Pay Resource', actionPipe: [] }
const players: PlayerType[] = [{ 
  name: "Joe",
  id: 'INIT ID',
  type: TYPE_ENUM.PLAYER
}];

export const GameState: BlueprintType = {
  gameComponents: [],
  resources: [],
  actions: [],
  effects: [],
  playAreas: []
}

