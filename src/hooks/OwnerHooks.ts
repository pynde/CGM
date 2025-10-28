import { useContext } from "react"
import { GameStateContext } from "../context/GameStateContext"
import { GameState, isTypeOf, Owner, OwnerArray, PlayerType } from "@shared/types/types"
import { OWNER_TYPE_ENUM } from "@shared/enums/enums"



const sortOwnersByType = (owners: OwnerArray<unknown> | undefined) => {
    if(owners) owners.sort((a, b) => a[1].type < b[1].type ? -1 : a[1].type > b[1].type ? 1 : 0);
}

export const useOwner = <T = {}>(owner?: Owner<T>) => {

    const getOwnersByType = <T>(gameState: GameState, type: OWNER_TYPE_ENUM): OwnerArray<T> => {
        if(gameState) {
            const owners = gameState.owners.filter((owner): owner is [string, Owner<T>] => {
            const result = isTypeOf<T>(owner[1], type);
            return result;
        });
        return owners
        }
        else return []
    }
    const getOwnersArray = (gameState: GameState) => {
        if(gameState) return gameState.owners
    }

    const getOwnersMap = (gameState: GameState) => {
        if(gameState) return new Map(gameState.owners);
    }
    
    return {
        owner,
        getOwnersByType,
        getOwnersArray,
        getOwnersMap
    }

}