import {  DIRECTION_OF_FLOW_ENUM, FACE_VISIBLE_ENUM, GAME_STATE_ENUM, ERROR_CODE_ENUM, SELECTION_TYPE_ENUM, SPACE_TYPE_ENUM, GAME_COMPONENT_STATE_ENUM, TRACK_TYPE_ENUM, EFFECT_TYPE_ENUM, SYMBOL_TYPE_ENUM, TYPE_ENUM } from "../enums/enums"

// BASE TYPE

export type BaseType<T = {}> = {
    type: string
    name: string,
    id: string,
} & T;


// GAME STATE

// BLUEPRINT

export type BlueprintType = {
    gameComponents: Array<[GameComponentType['id'], GameComponentType]>,
    resources: Array<[ResourceType['id'], ResourceType]>,
    actions: Array<[ActionType['id'], ActionType]>,
    effects: Array<[EffectType['id'], EffectType]>,
    playAreas: Array<[PlayAreaType['id'], PlayAreaType]>,
}

// ACTIONS

export type ActionType = BaseType & { 
    type: TYPE_ENUM.ACTION,
    name: string,
    automatic: boolean,
    id: string,
    actionPipe: (ActionType & Partial<GroupType<ActionType>>)[],
    optional?: boolean,
    style?: Partial<VisualType>
    ownerId: string,
    target?: Owner
    payload?: unknown
};

export type SubActionType = ActionType & Partial<GroupType<ActionType>>;

// GAME COMPONENTS 

export type DeckType = BaseType & {
    typesOfCards: "HETERO" | "HOMO",
    directionOfFlow: DIRECTION_OF_FLOW_ENUM
}

export type CardType = GameComponentType<{
    visibleSide?: FACE_VISIBLE_ENUM.FRONT | FACE_VISIBLE_ENUM.BACK,
    requirement?: unknown,
}>;

export type MeepleType = GameComponentType<{
    inUse: boolean
}>;

export type GameComponentType<T = {}> = BaseType & {
    type: TYPE_ENUM.GAME_COMPONENT,
    id: string,
    actions: ActionType[],
    price: ResourceType[],
    ownerId: string,
    symbols?: SymbolType[],
    effects?: EffectType[],
    style?: VisualType,
    state?: GAME_COMPONENT_STATE_ENUM,
    twoSided?: boolean,
} & T;


// RESOURCES

export type ResourceType = BaseType & {
    value: number | string;
    type: TYPE_ENUM.RESOURCE,
    amount: number,
    allowNegativeAmount?: boolean, 
    style?: VisualType
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
    type: TYPE_ENUM.PLAYER
    name: string,
    style?: VisualType
    actions: ActionType[],
    id: string
}

export type Owner = BaseType & {
    id: string
    type: TYPE_ENUM.OWNER,
    resources: ResourceType[],
    gameComponents: GameComponentType[],
} 

export type BankType = {
    type: TYPE_ENUM.BANK,
    id: string,
}

// SPACES

export type PlayAreaType = BaseType & {
    type: TYPE_ENUM.PLAY_AREA,
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
    width?: number,
    height?: number,
    maxHeight?: number,
    maxWidth?: number,
    background?: string,
    zIndex?: number,
    x?: number,
    y?: number,
    fill?: string
}

// ARRAYS AND MAPS

export type GameComponentTypeMap = Map<GameComponentType['id'], GameComponentType>;
export type SelectedArray = Array<[GameComponentType['id'], GameComponentType]>;
export type ActionArray = ActionType[];
export type ActionMap = Map<ActionType['id'], ActionType>;
export type OwnerArray = Array<[string, Owner]>;
export type TupletArray<T> = Array<[string, T]> ;

/** Type for multiple values for a resource. E.g. player has 2 coins which are both valued differently (e.g. one coin has 5 value, another coin has 3 value = 8 value) */ 
export type VariableValue = number[];

/** Type for fixed value for a resource. E.g. player has 5 coins and they are of equal value (= value 5). */
export type FixedValue = number;

export type TailwindCSS = string;

// TYPE GUARDS

export const isTypeOf = <T>(objectToTest: any, type: string | object): objectToTest is T => {
    if(objectToTest === null || typeof objectToTest !== 'object') return false;
    if(typeof type === 'string') {
        if(objectToTest.type === type) return true;
        else return false;
    }
    else {
        return Object.values(type).includes(objectToTest.type);
    }
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