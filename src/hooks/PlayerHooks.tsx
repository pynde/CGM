import { useContext, useMemo } from "react"
import { GameStateContext } from "../context/GameStateContext"
import { Player } from "../components/Player/Player";
import React from "react";
import { PlayerType } from "@shared/types/types";
import { OWNER_TYPE_ENUM } from "@shared/enums/enums";



// export const usePlayers = () => {

//     const getPlayerById = (id: string): PlayerType | undefined => {
//         const player = gameState.players.find(player => player.id = id);
//         if(player) {
//             return player
//         }
//         else {
//             return undefined
//         }
//     }
//     const { gameState } = useContext(GameStateContext);
//     const players = useMemo(() => {
//     if(gameState.players.length > 0){
//         return gameState.players.map(player => {
//             return <Player id={player.id} actions={player.actions} name={player.name} type={OWNER_TYPE_ENUM.PLAYER}/>
//         })
//     }
//     else return null
// }, [gameState.players])
//     return { playersMemo, getPlayerById }
// }

