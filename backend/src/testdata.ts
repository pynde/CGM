import { Owner, BankType, ResourceType, ActionType, GameComponentType, CardType, MeepleType, PlayerType, OwnerArray, BlueprintType } from '@shared/types/types';
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

const bank: Owner<BankType> = { type: OWNER_TYPE_ENUM.BANK, id: '', gameComponents: [], resources: [], name: 'Bank' };
const resource: ResourceType = { type: RESOURCE_ENUM.MONEY, resource: { value: 1 }, amount: 10, id: resourceId, style: { fill: 'yellow', width: 200, height: 200 }, name: 'Money' }
/** HUOM NÄMÄ ACTIONIEN OWNER ID PITÄNEE POISTAA. RISTIRIIDASSA BLUEPRINTIN KANSSA. KÄYTTÄJÄN PITÄÄ PYSTYÄ LUOMAAN OMISTAMATON ACTION */
const finish_action: ActionType = { type: ACTION_TYPE_ENUM.FINISH_ACTION, automatic: false, id: actionId_0, ownerId: card_id, name: 'Finish', actionPipe: [] }
const transfer_action: ActionType = { type: ACTION_TYPE_ENUM.TRANSFER_ACTION, automatic: false, id: actionId_1, ownerId: card_id, name: 'Transfer resources', actionPipe: [] }
const card_action: ActionType = { type: ACTION_TYPE_ENUM.PAY_RESOURCE, automatic: false, id: actionId_2, ownerId: card_id, payload: "Raha payload", target: bank, actionPipe: [transfer_action, finish_action], name: 'Pay resource' }
const meeple_action: ActionType = { type: ACTION_TYPE_ENUM.DRAW_COMPONENT, automatic: false, id: actionId_3, ownerId: meeple_id, actionPipe: [finish_action], name: 'Draw component' };
const collect_resource_action: ActionType = { type: ACTION_TYPE_ENUM.COLLECT_RESOUCE, automatic: false, id: generateId(), ownerId: card_id, name: 'Collect Resource', actionPipe: [] };
const play_component_action: ActionType = { type: ACTION_TYPE_ENUM.PLAY_COMPONENT, automatic: false, id: generateId(), ownerId: card_id, name: 'Play Component', actionPipe: [] };
const start_turn_action: ActionType = { type: ACTION_TYPE_ENUM.START_TURN, automatic: false, id: generateId(), ownerId: playerId, name: 'Start Turn', actionPipe: [] };
const confirm_turn_action: ActionType = { type: ACTION_TYPE_ENUM.CONFIRM_TURN, automatic: false, id: generateId(), ownerId: playerId, name: 'Confirm Turn', actionPipe: [] };
const pass_turn_action: ActionType = { type: ACTION_TYPE_ENUM.PASS_TURN, automatic: false, id: generateId(), ownerId: playerId, name: 'Pass Turn', actionPipe: [] };
const shuffle_action: ActionType = { type: ACTION_TYPE_ENUM.SHUFFLE, automatic: false, id: generateId(), ownerId: card_id, name: 'Shuffle', actionPipe: [] };
const trade_resource_action: ActionType = { type: ACTION_TYPE_ENUM.TRADE_RESOURCE, automatic: false, id: generateId(), ownerId: playerId, name: 'Trade Resource', actionPipe: [] };
const upgrade_component_action: ActionType = { type: ACTION_TYPE_ENUM.UPGRADE_COMPONENT, automatic: false, id: generateId(), ownerId: card_id, name: 'Upgrade Component', actionPipe: [] };
const downgrade_component_action: ActionType = { type: ACTION_TYPE_ENUM.DOWNGRADE_COMPONENT, automatic: false, id: generateId(), ownerId: card_id, name: 'Downgrade Component', actionPipe: [] };
const move_component_action: ActionType = { type: ACTION_TYPE_ENUM.MOVE_COMPONENT, automatic: false, id: generateId(), ownerId: card_id, name: 'Move Component', actionPipe: [] };
const attack_player_action: ActionType = { type: ACTION_TYPE_ENUM.ATTACK_PLAYER, automatic: false, id: generateId(), ownerId: playerId, name: 'Attack Player', actionPipe: [] };
const defend_player_action: ActionType = { type: ACTION_TYPE_ENUM.DEFEND_PLAYER, automatic: false, id: generateId(), ownerId: playerId, name: 'Defend Player', actionPipe: [] };
const build_player_action: ActionType = { type: ACTION_TYPE_ENUM.BUILD_PLAYER, automatic: false, id: generateId(), ownerId: playerId, name: 'Build Player', actionPipe: [] };
const destroy_player_action: ActionType = { type: ACTION_TYPE_ENUM.DESTROY_PLAYER, automatic: false, id: generateId(), ownerId: playerId, name: 'Destroy Player', actionPipe: [] };
const trade_player_action: ActionType = { type: ACTION_TYPE_ENUM.TRADE_PLAYER, automatic: false, id: generateId(), ownerId: playerId, name: 'Trade Player', actionPipe: [] };
const explore_player_action: ActionType = { type: ACTION_TYPE_ENUM.EXPLORE_PLAYER, automatic: false, id: generateId(), ownerId: playerId, name: 'Explore Player', actionPipe: [] };
const research_player_action: ActionType = { type: ACTION_TYPE_ENUM.RESEARCH_PLAYER, automatic: false, id: generateId(), ownerId: playerId, name: 'Research Player', actionPipe: [] };
const upgrade_player_action: ActionType = { type: ACTION_TYPE_ENUM.UPGRADE_PLAYER, automatic: false, id: generateId(), ownerId: playerId, name: 'Upgrade Player', actionPipe: [] };
const downgrade_player_action: ActionType = { type: ACTION_TYPE_ENUM.DOWNGRADE_PLAYER, automatic: false, id: generateId(), ownerId: playerId, name: 'Downgrade Player', actionPipe: [] };
const move_player_action: ActionType = { type: ACTION_TYPE_ENUM.MOVE_PLAYER, automatic: false, id: generateId(), ownerId: playerId, name: 'Move Player', actionPipe: [] };
const attack_component_action: ActionType = { type: ACTION_TYPE_ENUM.ATTACK_COMPONENT, automatic: false, id: generateId(), ownerId: card_id, name: 'Attack Component', actionPipe: [] };
const defend_component_action: ActionType = { type: ACTION_TYPE_ENUM.DEFEND_COMPONENT, automatic: false, id: generateId(), ownerId: card_id, name: 'Defend Component', actionPipe: [] };
const build_component_action: ActionType = { type: ACTION_TYPE_ENUM.BUILD_COMPONENT, automatic: false, id: generateId(), ownerId: card_id, name: 'Build Component', actionPipe: [] };
const destroy_component_action: ActionType = { type: ACTION_TYPE_ENUM.DESTROY_COMPONENT, automatic: false, id: generateId(), ownerId: card_id, name: 'Destroy Component', actionPipe: [] };
const trade_component_action: ActionType = { type: ACTION_TYPE_ENUM.TRADE_COMPONENT, automatic: false, id: generateId(), ownerId: card_id, name: 'Trade Component', actionPipe: [] };
const explore_component_action: ActionType = { type: ACTION_TYPE_ENUM.EXPLORE_COMPONENT, automatic: false, id: generateId(), ownerId: card_id, name: 'Explore Component', actionPipe: [] };
const research_component_action: ActionType = { type: ACTION_TYPE_ENUM.RESEARCH_COMPONENT, automatic: false, id: generateId(), ownerId: card_id, name: 'Research Component', actionPipe: [] };

export const players: PlayerType[] = [{ 
    name: "Joe",
    actions: [],
    id: 'socketista_testi123',
    type: OWNER_TYPE_ENUM.PLAYER
}];

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

export const owners: OwnerArray<PlayerType> = [
  [players[0].id, { resources: [resource], gameComponents: components, ...players[0] }]
];

// const owners_b: OwnerArray<GameComponent> = [
//   [components[0].id, { resources: [resource], gameComponents: components }]
// ]

export const blueprint: BlueprintType = {
    gameComponents: components.map(c => [c.id, c]),
    resources: [[resource.id, resource]],
    actions: [
        [card_action.id, card_action], [meeple_action.id, meeple_action], [finish_action.id, finish_action], [transfer_action.id, transfer_action],
        [collect_resource_action.id, collect_resource_action], [play_component_action.id, play_component_action], [start_turn_action.id, start_turn_action],
        [confirm_turn_action.id, confirm_turn_action], [pass_turn_action.id, pass_turn_action], [shuffle_action.id, shuffle_action],
        [trade_resource_action.id, trade_resource_action], [upgrade_component_action.id, upgrade_component_action], [downgrade_component_action.id, downgrade_component_action],
        [move_component_action.id, move_component_action], [attack_player_action.id, attack_player_action], [defend_player_action.id, defend_player_action],
        [build_player_action.id, build_player_action], [destroy_player_action.id, destroy_player_action], [trade_player_action.id, trade_player_action],
        [explore_player_action.id, explore_player_action], [research_player_action.id, research_player_action], [upgrade_player_action.id, upgrade_player_action],
        [downgrade_player_action.id, downgrade_player_action], [move_player_action.id, move_player_action], [attack_component_action.id, attack_component_action],
        [defend_component_action.id, defend_component_action], [build_component_action.id, build_component_action], [destroy_component_action.id, destroy_component_action],
        [trade_component_action.id, trade_component_action], [explore_component_action.id, explore_component_action], [research_component_action.id, research_component_action]
    ],
    effects:[]
};
