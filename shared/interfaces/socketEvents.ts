import { ActionType, BlueprintType, GameComponent, GameState, OwnerArray, SelectedArray } from "@shared/types/types";


export interface ServerToClientEvents {
    gameState: (gameState: GameState) => void,
    owners: (owners: OwnerArray<unknown>) => void,
    actionState: (actionState: ActionType[]) => void
    components: (components: GameComponent[]) => void
    selectedComponents: (components: SelectedArray) => void

    blueprint: (blueprint: BlueprintType) => void
}

export interface ClientToServerEvents {
    setSelectedComponents: (selectedComponents: SelectedArray, cb: (status: string) => void) => void;
    updateGameState: (newState: Partial<GameState>, cb: (status: string) => void) => void;
    updateOwners: (owners: OwnerArray<unknown>, cb: (status: string) => void) => void;
    updateBlueprint: (blueprint: BlueprintType, cb: (status: string) => void) => void;
    getBlueprint: (cb: (blueprint: BlueprintType, status: string) => void) => void;
    getGameState: (cb: (gameState: GameState, status: string) => void) => void;
    getOwners: (cb: <T>(ownerArray: OwnerArray<T>, status: string) => void) => void;
  }

export interface SocketData {
    gameState: GameState
}