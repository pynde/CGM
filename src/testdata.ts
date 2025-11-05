import { TYPES_AS_STRING } from '@shared/enums/enums';
import { generateId } from '@shared/logic/generateId';
import type { ActionType, BlueprintType, GameComponentType, OwnerArray, OwnerType, PlayAreaType, ResourceType, VisualType } from '@shared/types/types';

const CARD_TEMPLATE: Partial<VisualType> = {
    x: 0,
    y: 0,
    width: 150,
    height: 200,
    fill: 'white',
};

const MEEPLE_TEMPLATE: Partial<VisualType> = {
    width: 100,
    height: 100,
    fill: 'darkblue',
};

const GAMEBOARD_TEMPLATE: Partial<VisualType> = {
    width: 400,
    height: 100,
    fill: 'green',
};


export const frontPic = "https://picsum.photos/id/202/200/300";
export const backPic = "https://picsum.photos/id/203/200/300";

const playerId = 'testi-id';
const card_id = "card-test-id";
const meeple_id = "meeple-test-id";
const board_id = "board-test-id";
const resourceId = "resource-test-id";
const actionId_0 = "action-test-id-0";
const actionId_1 = "action-test-id-1";
const actionId_2 = "action-test-id-2";
const actionId_3 = "action-test-id-3";

const bank: OwnerType = { type: TYPES_AS_STRING.BANK, id: generateId(), name: 'Bank' };
const resource: ResourceType = { type: TYPES_AS_STRING.RESOURCE, value: 1, amount: 10, id: resourceId, style: { fill: 'yellow', width: 200, height: 200 }, name: 'Money' }
const drawcomponent_action: ActionType = { type: TYPES_AS_STRING.ACTION, automatic: false, id: generateId(), ownerId: '', name: 'Draw Card', actionPipe: [] };
/** HUOM NÄMÄ ACTIONIEN OWNER ID PITÄNEE POISTAA. RISTIRIIDASSA BLUEPRINTIN KANSSA. KÄYTTÄJÄN PITÄÄ PYSTYÄ LUOMAAN OMISTAMATON ACTION */
const finish_action: ActionType = { type: TYPES_AS_STRING.ACTION, automatic: false, id: actionId_0, ownerId: card_id, name: 'Finish', actionPipe: [] }
const transfer_action: ActionType = { type: TYPES_AS_STRING.ACTION, automatic: false, id: actionId_1, ownerId: card_id, name: 'Transfer resources', actionPipe: [] }
const card_action: ActionType = { type: TYPES_AS_STRING.ACTION, automatic: false, id: actionId_2, ownerId: card_id, payload: "Raha payload", target: bank, actionPipe: [transfer_action, finish_action], name: 'Pay resource' }
const meeple_action: ActionType = { type: TYPES_AS_STRING.ACTION, automatic: false, id: actionId_3, ownerId: meeple_id, actionPipe: [finish_action], name: 'Draw component' };


export const players: OwnerType[] = [{ 
    name: "Joe",
    id: 'socketista_testi123',
    type: TYPES_AS_STRING.PLAYER
}];

export const testcards: GameComponentType[] = [
  { 
      type: TYPES_AS_STRING.GAME_COMPONENT, 
      name: 'CARD 1', 
      id: generateId(),
      price: [resource], 
      actions: [card_action],
      style: CARD_TEMPLATE
    },
    {
      type: TYPES_AS_STRING.GAME_COMPONENT,
      name: 'CARD 2',
      id: generateId(),
      price: [resource],
      actions: [card_action],
      style: CARD_TEMPLATE
    }
  ]

export const components : GameComponentType[] = [
  { 
      type: TYPES_AS_STRING.GAME_COMPONENT, 
      name: 'TESTIKORTTI', 
      id: card_id, 
      price: [resource], 
      actions: [card_action],
      style: CARD_TEMPLATE
    },
    { 
      type: TYPES_AS_STRING.GAME_COMPONENT,
      name: 'TESTIMEEPLE',
      id: meeple_id,
      price: [],
      actions: [meeple_action],
      style: MEEPLE_TEMPLATE

    },
      { 
      type: TYPES_AS_STRING.GAME_COMPONENT,
      name: 'TESTILAUTA',
      id: board_id,
      price: [],
      actions: [meeple_action],
      style: GAMEBOARD_TEMPLATE
      
    }
];

export const playAreas: PlayAreaType[] = [
  {
    type: TYPES_AS_STRING.PLAY_AREA,
    id: generateId(),
    name: "Player Hand",
    contentIds: [],
    style: {
        x: 50,
        y: 100,
        width: 400,
        height: 300,
        fill: 'yellow' 
      }
  },
  {
    type: TYPES_AS_STRING.PLAY_AREA,
    id: generateId(),
    name: "Target Area",
    contentIds: [],
    style: {
        x: 100,
        y: 100,
        width: 600,
        height: 400,
        fill: 'green' 
      }
  }
]

export const owners: OwnerArray = [
  [players[0].id, { type: TYPES_AS_STRING.PLAYER, name: players[0].name, id: players[0].id }],
];

// const owners_b: OwnerArray<GameComponent> = [
//   [components[0].id, { resources: [resource], gameComponents: components }]
// ]

export const blueprint: BlueprintType = {
    gameComponents: testcards.map(c => [c.id, c]),
    resources: [[resource.id, resource]],
    actions: [
        [drawcomponent_action.id, drawcomponent_action]
    ],
    effects:[],
    playAreas: playAreas.map(p => [p.id, p])
};

export const blueprintToJsonFile = () => {
  try {
    return JSON.stringify(blueprint, null, 2);
  } catch (error) {
      console.error("Error writing blueprint.json:", error);
  }
}

export const getComponentsAsJson = () => {

}


const gameSetup = {
    players: players,
    playAreas: [
      playAreas[0],
      { ...playAreas[1],
        contentIds: [components[0].id]
       }
    ],
}
