import { Generated, Insertable, JSONColumnType, Selectable, Updateable } from 'kysely';
import { TYPES_AS_STRING } from '../shared/enums/enums';
import { VisualType } from '../shared/types/types';

interface GameComponentTable {
  id: Generated<string>;
  type: typeof TYPES_AS_STRING.GAME_COMPONENT;
  name: string;
  price: string; // JSON string of ResourceType[]
  symbols: string | null; // JSON string of SymbolType[]
  effects: string | null; // JSON string of EffectType[]
  style: string | null; // JSON string of VisualType
  twoSided: boolean | null;
}

interface ResourceTable {
  id: Generated<string>;
  type: typeof TYPES_AS_STRING.RESOURCE;
  name: string;
  value: string | number;
  amount: number;
  allowNegativeAmount: boolean | null;
  style: JSONColumnType<VisualType> | null;
}

interface ActionTable {
  id: Generated<string>;
  type: typeof TYPES_AS_STRING.ACTION;
  name: string;
  automatic: boolean;
  optional: boolean | null;
  style: JSONColumnType<VisualType> | null; // JSON string of VisualType
  ownerId: string;
  target: string | null; // JSON string of OwnerType
  payload: string | null; // JSON string of unknown
}

interface ActionPipeTable {
    originActionId: ActionTable['id'];
    pipeActionId: ActionTable['id'];
}

interface PlayAreaTable {
  id: Generated<string>;
  type: typeof TYPES_AS_STRING.PLAY_AREA;
  name: string;
  contentIds: string; // JSON string of string[]
  style: string | null; // JSON string of VisualType
}

export interface Database {
  game_component: GameComponentTable;
  resource: ResourceTable;
  action: ActionTable;
  play_area: PlayAreaTable;
}

export type SelectableGameComponent = Selectable<GameComponentTable>;
export type InsertableGameComponent = Insertable<GameComponentTable>;
export type UpdateableGameComponent = Updateable<GameComponentTable>;

export type SelectableResource = Selectable<ResourceTable>;
export type InsertableResource = Insertable<ResourceTable>;
export type UpdateableResource = Updateable<ResourceTable>;

export type SelectableAction = Selectable<ActionTable>;
export type InsertableAction = Insertable<ActionTable>;
export type UpdateableAction = Updateable<ActionTable>;

export type SelectablePlayArea = Selectable<PlayAreaTable>;
export type InsertablePlayArea = Insertable<PlayAreaTable>;
export type UpdateablePlayArea = Updateable<PlayAreaTable>;