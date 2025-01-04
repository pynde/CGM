import {  DIRECTION_OF_FLOW_ENUM, FACE_VISIBLE_ENUM, GAME_COMPONENT_ENUM, RESOURCE_ENUM, MODE_ENUM, TURN_MODE_ENUM, ACTION_TYPE_ENUM, GAME_STATE_ENUM, ERROR_CODE_ENUM, OWNER_TYPE_ENUM, SELECTION_TYPE_ENUM, SPACE_TYPE_ENUM, GAME_COMPONENT_STATE_ENUM, TRACK_TYPE_ENUM, EFFECT_TYPE_ENUM, SYMBOL_TYPE_ENUM } from "../enums/enums"

// BASE TYPE

export type BaseType = {
    type: string
    name: string,
    id: string,
}


// GAME STATE

export type GameState = {
    type: GAME_STATE_ENUM.GAME_STATE_TYPE,
    players: PlayerType[],
    owners: OwnerArray<unknown>,
    selectedComponents: SelectedArray,
    actions: ActionArray,
    activePlayer: PlayerType['id'],
    errors: ErrorType[]
}

export const isGameStateType = (x: any): x is GameState => {
    if(x.type === GAME_STATE_ENUM.GAME_STATE_TYPE) return true;
    else return false;
}

// BLUEPRINT

export type BlueprintType = {
    gameComponents: Array<[GameComponentType['id'], GameComponentType]>,
    resources: Array<[ResourceType['id'], ResourceType]>,
    actions: Array<[ActionType['id'], ActionType]>
}

// ACTIONS

export type ActionType = BaseType & { 
    type: ACTION_TYPE_ENUM,
    name: string,
    automatic: boolean,
    id: string,
    actionPipe: (ActionType & Partial<GroupType<ActionType>>)[],
    optional?: boolean,
    style?: Partial<VisualType>
    ownerId: string,
    target?: Owner<unknown>
    payload?: unknown
};

export type SubActionType = ActionType & Partial<GroupType<ActionType>>;

// GAME COMPONENTS 

export type DeckType = BaseType & {
    typesOfCards: "HETERO" | "HOMO",
    directionOfFlow: DIRECTION_OF_FLOW_ENUM
}

export type CardType = GameComponentType<{
    type: GAME_COMPONENT_ENUM.CARD,
    name: string,
    visibleSide?: FACE_VISIBLE_ENUM.FRONT | FACE_VISIBLE_ENUM.BACK,
    requirement?: unknown,
}>;

export type MeepleType = GameComponentType<{
    type: GAME_COMPONENT_ENUM.MEEPLE
    name: string,
    inUse: boolean
}>;

export type GameComponentType<T = {}> = BaseType & {
    type: GAME_COMPONENT_ENUM,
    id: string,
    style: VisualType,
    actions: ActionType[],
    price: ResourceType[],
    ownerId: string,
    symbols?: SymbolType[],
    effects?: EffectType[],
    state?: GAME_COMPONENT_STATE_ENUM,
    twoSided?: boolean,
} & T;


// RESOURCES

export type ResourceType = & BaseType & (
    | { type: RESOURCE_ENUM.MONEY; resource: Money }
    | { type: RESOURCE_ENUM.CUSTOM; resource: CustomResource }
) & { id: string, amount: number, allowNegativeAmount?: boolean, style?: VisualType }

export type Money = {
    value: MultipleValues | FixedValue;
}

export type CustomResource = {
    [key: string]: string | number
}

// TRACK

export type TrackType = {
    type: TRACK_TYPE_ENUM.TRACK,
    name: string,
    id: string,
    effects: EffectType[]
}

// EFFECT

export type EffectType = {
    type: EFFECT_TYPE_ENUM.EFFECT
    name: string,
    id: string, 
    payload?: unknown,
}

// SYMBOL

export type SymbolType = {
    type: SYMBOL_TYPE_ENUM.SYMBOL,
    name: string,
    id: string,
    payload?: unknown,
}

// OWNERS

export type PlayerType = {
    type: OWNER_TYPE_ENUM.PLAYER
    name: string,
    style?: VisualType
    actions: ActionType[],
    id: string
}

export type Owner<T> = BaseType & {
    id: string
    type: OWNER_TYPE_ENUM,
    resources: ResourceType[],
    gameComponents: GameComponentType[],
} & T

export type BankType = {
    type: OWNER_TYPE_ENUM.BANK,
    id: string,
}

// SPACES

export type SpaceType = {
    type: SPACE_TYPE_ENUM,
    style?: VisualType
}

// SELECTION

export type SelectionType = {
    type: SELECTION_TYPE_ENUM,
}

// ERRORS

export type ErrorType = {
    errorCode: ERROR_CODE_ENUM
    message: string
}

// CONNECTORS

export type GroupType<T> = T & { 
    group: T[]
};

// UI

export type VisualType<T = {}> = T & {
    imgUrls?: string[],
    width: number,
    height: number,
    maxHeight?: number,
    maxWidth?: number,
    background?: string
}

// ARRAYS AND MAPS

export type GameComponentTypeMap = Map<GameComponentType['id'], GameComponentType>;
export type SelectedArray = Array<[GameComponentType['id'], GameComponentType]>;
export type ActionArray = ActionType[];
export type ActionMap = Map<ActionType['id'], ActionType>;
export type OwnerArray<T> = Array<[string, Owner<T>]>;
export type TupletArray<T> = Array<[string, T]> ;

/** Type for multiple values for a resource. E.g. player has 5 coins which are all valued differently (e.g. one coin has 5 value, another coin has 3 value = 8 value) */ 
export type MultipleValues = number[];

/** Type for fixed value for a resource. E.g. player has 5 coins and they are of equal value (= value 5). */
export type FixedValue = number;

export type TailwindCSS = string;

// TYPE GUARDS

export const isTypeOf = <T>(x: any, type: string | object): x is T => {
    if(typeof type === 'string') {
        if(x.type === type) return true;
        else return false;
    }
    else {
        return Object.values(type).includes(x.type);
    }
}

export const isGameStateProperty = <T extends keyof GameState>(
    value: object
  ): value is Partial<Record<T, GameState[T]>> => {
    const gameStateKeys: (keyof GameState)[] = [
        'type', 'players', 'owners', 'selectedComponents', 'actions', 
        'activePlayer', 'errors'
    ];
    return Object.keys(value).every((key) => gameStateKeys.includes(key as keyof GameState));
  }

export const isTypeOfTuplet = <T>(x: any, type: object): x is T  => {
    // Expected type is Array<[string, Object]>
    if(Array.isArray(x)) {
       if(Object.values(type).includes(x[0][1].type)) {
        return true;
        }
        else {
        console.log(`${x} array's first element (array[0].type) is not included in ENUMs`);
        return false;
        } 
    }
    else return false;
    
}