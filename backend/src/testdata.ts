import { Owner, BankType, ResourceType, ActionType, GameComponentType, CardType, MeepleType, PlayerType, OwnerArray, BlueprintType, PlayAreaType } from '@shared/types/types';
import { OWNER_TYPE_ENUM, RESOURCE_ENUM, ACTION_TYPE_ENUM, TYPE_ENUM } from '@shared/enums/enums';
import { generateId } from '@shared/logic/generateId';
import { CARD_TEMPLATE, GAMEBOARD_TEMPLATE, MEEPLE_TEMPLATE } from '@shared/templates/StyleTemplates';

export const frontPic = "https://picsum.photos/id/202/200/300";
export const backPic = "https://picsum.photos/id/203/200/300";

const playerId = 'testi-id';
const card_id = generateId();
const meeple_id = generateId();
const board_id = generateId();
const resourceId = generateId();
const actionId_0 = generateId();
const actionId_1 = generateId();
const actionId_2 = generateId();
const actionId_3 = generateId();

const bank: Owner = { type: TYPE_ENUM.OWNER, id: '', gameComponents: [], resources: [], name: 'Bank' };
const resource: ResourceType = { type: TYPE_ENUM.RESOURCE, value: 1, amount: 10, id: resourceId, style: { fill: 'yellow', width: 200, height: 200 }, name: 'Money' }
const drawcomponent_action: ActionType = { type: TYPE_ENUM.ACTION, automatic: false, id: generateId(), ownerId: '', name: 'Draw Card', actionPipe: [] };
/** HUOM NÄMÄ ACTIONIEN OWNER ID PITÄNEE POISTAA. RISTIRIIDASSA BLUEPRINTIN KANSSA. KÄYTTÄJÄN PITÄÄ PYSTYÄ LUOMAAN OMISTAMATON ACTION */
const finish_action: ActionType = { type: TYPE_ENUM.ACTION, automatic: false, id: actionId_0, ownerId: card_id, name: 'Finish', actionPipe: [] }
const transfer_action: ActionType = { type: TYPE_ENUM.ACTION, automatic: false, id: actionId_1, ownerId: card_id, name: 'Transfer resources', actionPipe: [] }
const card_action: ActionType = { type: TYPE_ENUM.ACTION, automatic: false, id: actionId_2, ownerId: card_id, payload: "Raha payload", target: bank, actionPipe: [transfer_action, finish_action], name: 'Pay resource' }
const meeple_action: ActionType = { type: TYPE_ENUM.ACTION, automatic: false, id: actionId_3, ownerId: meeple_id, actionPipe: [finish_action], name: 'Draw component' };
const collect_resource_action: ActionType = { type: TYPE_ENUM.ACTION, automatic: false, id: generateId(), ownerId: card_id, name: 'Collect Resource', actionPipe: [] };
const play_component_action: ActionType = { type: TYPE_ENUM.ACTION, automatic: false, id: generateId(), ownerId: card_id, name: 'Play Component', actionPipe: [] };
const start_turn_action: ActionType = { type: TYPE_ENUM.ACTION, automatic: false, id: generateId(), ownerId: playerId, name: 'Start Turn', actionPipe: [] };
const confirm_turn_action: ActionType = { type: TYPE_ENUM.ACTION, automatic: false, id: generateId(), ownerId: playerId, name: 'Confirm Turn', actionPipe: [] };
const pass_turn_action: ActionType = { type: TYPE_ENUM.ACTION, automatic: false, id: generateId(), ownerId: playerId, name: 'Pass Turn', actionPipe: [] };
const shuffle_action: ActionType = { type: TYPE_ENUM.ACTION, automatic: false, id: generateId(), ownerId: card_id, name: 'Shuffle', actionPipe: [] };
const trade_resource_action: ActionType = { type: TYPE_ENUM.ACTION, automatic: false, id: generateId(), ownerId: playerId, name: 'Trade Resource', actionPipe: [] };
const upgrade_component_action: ActionType = { type: TYPE_ENUM.ACTION, automatic: false, id: generateId(), ownerId: card_id, name: 'Upgrade Component', actionPipe: [] };
const downgrade_component_action: ActionType = { type: TYPE_ENUM.ACTION, automatic: false, id: generateId(), ownerId: card_id, name: 'Downgrade Component', actionPipe: [] };
const move_component_action: ActionType = { type: TYPE_ENUM.ACTION, automatic: false, id: generateId(), ownerId: card_id, name: 'Move Component', actionPipe: [] };
const attack_player_action: ActionType = { type: TYPE_ENUM.ACTION, automatic: false, id: generateId(), ownerId: playerId, name: 'Attack Player', actionPipe: [] };
const defend_player_action: ActionType = { type: TYPE_ENUM.ACTION, automatic: false, id: generateId(), ownerId: playerId, name: 'Defend Player', actionPipe: [] };
const build_player_action: ActionType = { type: TYPE_ENUM.ACTION, automatic: false, id: generateId(), ownerId: playerId, name: 'Build Player', actionPipe: [] };
const destroy_player_action: ActionType = { type: TYPE_ENUM.ACTION, automatic: false, id: generateId(), ownerId: playerId, name: 'Destroy Player', actionPipe: [] };
const trade_player_action: ActionType = { type: TYPE_ENUM.ACTION, automatic: false, id: generateId(), ownerId: playerId, name: 'Trade Player', actionPipe: [] };
const explore_player_action: ActionType = { type: TYPE_ENUM.ACTION, automatic: false, id: generateId(), ownerId: playerId, name: 'Explore Player', actionPipe: [] };
const research_player_action: ActionType = { type: TYPE_ENUM.ACTION, automatic: false, id: generateId(), ownerId: playerId, name: 'Research Player', actionPipe: [] };
const upgrade_player_action: ActionType = { type: TYPE_ENUM.ACTION, automatic: false, id: generateId(), ownerId: playerId, name: 'Upgrade Player', actionPipe: [] };
const downgrade_player_action: ActionType = { type: TYPE_ENUM.ACTION, automatic: false, id: generateId(), ownerId: playerId, name: 'Downgrade Player', actionPipe: [] };
const move_player_action: ActionType = { type: TYPE_ENUM.ACTION, automatic: false, id: generateId(), ownerId: playerId, name: 'Move Player', actionPipe: [] };
const attack_component_action: ActionType = { type: TYPE_ENUM.ACTION, automatic: false, id: generateId(), ownerId: card_id, name: 'Attack Component', actionPipe: [] };
const defend_component_action: ActionType = { type: TYPE_ENUM.ACTION, automatic: false, id: generateId(), ownerId: card_id, name: 'Defend Component', actionPipe: [] };
const build_component_action: ActionType = { type: TYPE_ENUM.ACTION, automatic: false, id: generateId(), ownerId: card_id, name: 'Build Component', actionPipe: [] };
const destroy_component_action: ActionType = { type: TYPE_ENUM.ACTION, automatic: false, id: generateId(), ownerId: card_id, name: 'Destroy Component', actionPipe: [] };
const trade_component_action: ActionType = { type: TYPE_ENUM.ACTION, automatic: false, id: generateId(), ownerId: card_id, name: 'Trade Component', actionPipe: [] };
const explore_component_action: ActionType = { type: TYPE_ENUM.ACTION, automatic: false, id: generateId(), ownerId: card_id, name: 'Explore Component', actionPipe: [] };
const research_component_action: ActionType = { type: TYPE_ENUM.ACTION, automatic: false, id: generateId(), ownerId: card_id, name: 'Research Component', actionPipe: [] };

export const players: PlayerType[] = [{ 
    name: "Joe",
    actions: [],
    id: 'socketista_testi123',
    type: TYPE_ENUM.PLAYER
}];

export const testcards: GameComponentType[] = [
  { 
      type: TYPE_ENUM.GAME_COMPONENT, 
      name: 'CARD 1', 
      id: generateId(),
      price: [resource], 
      actions: [card_action],
      ownerId: players[0].id,
      style: CARD_TEMPLATE
    },
    {
      type: TYPE_ENUM.GAME_COMPONENT,
      name: 'CARD 2',
      id: generateId(),
      price: [resource],
      actions: [card_action],
      ownerId: players[0].id,
      style: CARD_TEMPLATE
    }
  ]

export const components : GameComponentType[] = [
  { 
      type: TYPE_ENUM.GAME_COMPONENT, 
      name: 'TESTIKORTTI', 
      id: card_id, 
      price: [resource], 
      actions: [card_action],
      ownerId: players[0].id,
      style: CARD_TEMPLATE
    },
    { 
      type: TYPE_ENUM.GAME_COMPONENT,
      name: 'TESTIMEEPLE',
      id: meeple_id,
      price: [],
      actions: [meeple_action],
      ownerId: players[0].id,
      style: MEEPLE_TEMPLATE

    },
      { 
      type: TYPE_ENUM.GAME_COMPONENT,
      name: 'TESTILAUTA',
      id: board_id,
      price: [],
      actions: [meeple_action],
      ownerId: players[0].id,
      style: GAMEBOARD_TEMPLATE
      
    }
];

export const playAreas: PlayAreaType[] = [
  {
    type: TYPE_ENUM.PLAY_AREA,
    id: generateId(),
    name: "Player Hand",
    style: {
        x: 200,
        y: 200,
        width: 300,
        height: 200,
        fill: 'yellow' 
      }
  },
  {
    type: TYPE_ENUM.PLAY_AREA,
    id: generateId(),
    name: "Target Area",
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
  [players[0].id, { resources: [resource], gameComponents: components, type: TYPE_ENUM.OWNER, name: players[0].name, id: players[0].id }],
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
