import { useContext, useState } from "react"
import {  ACTION_TYPE_ENUM, ERROR_CODE_ENUM, GAME_COMPONENT_ENUM, GAME_COMPONENT_STATE_ENUM, GAME_STATE_ENUM, LOCALHOST_PORT, OWNER_TYPE_ENUM, SELECTION_TYPE_ENUM, SOCKET_RESPONSE } from "@shared/enums/enums";
import { ActionArray, ActionType, ErrorType,  GameComponentType,  GameState, isGameStateProperty, isGameStateType, isTypeOf, isTypeOfTuplet, Owner, OwnerArray, PlayerType, ResourceType, SelectedArray } from "@shared/types/types";
import { GameStateContext } from "../context/GameStateContext";
import { useErrors } from "./ErrorHooks";

export type ActionReducer = (state: GameState | undefined, actionType: ActionType | Partial<GameState>) => GameState | undefined;

export const useActions = () => {
    const { gameState, updateGS } = useContext(GameStateContext);
    const { checkIfErrorsExist } = useErrors();
    const [waitingToConfirm, setWaitingToConfirm] = useState<boolean>(false);
    /** Add actions and update GameState. This cascades renders on components dependent on GameState. 
     * @param newActions Tuple array to add to the GameState.
      */
    const addActionsToGameState = (newActions: ActionArray) => {
        updateGS({ ...gameState, actions: newActions });
    };

    const actionReducer: ActionReducer = (gameState: GameState | undefined, value: ActionType<unknown> | Partial<GameState>): GameState | undefined => {
        let tempGS = gameState;
        if(isGameStateProperty(value)) {
            if(isGameStateType(value)) {
                console.log('gs', gameState, 'val', value);
                return { ...value }
            }
        }
        else if(isTypeOf<ActionType>(value, ACTION_TYPE_ENUM) && tempGS) {
            const action = value;
            switch(value.type) {
                case ACTION_TYPE_ENUM.START_TURN: console.log(ACTION_TYPE_ENUM.START_TURN); break;
                case ACTION_TYPE_ENUM.PAY_RESOURCE: return payResourceTypes(tempGS, action); 
                case ACTION_TYPE_ENUM.PLAY_COMPONENT: tempGS = playGC(tempGS, action); break;
                case ACTION_TYPE_ENUM.FINISH_ACTION: finishAction(tempGS, action); break;
                default: console.log('No function for action:', action.type); break
            }
            //if(action.actionPipe) actionReducer(tempGS, action.actionPipe[index], index++);
        }
        return tempGS;
    }

    
    const payResourceTypes = (gameState: GameState, action: ActionType) => {
        performance.mark('start');
        const owners = new Map(gameState.owners);
        const owner = owners.get(action.ownerId);
        const target = action.target;
        if(owner && target) {
            const playerResourceTypes = owner.resources.map<[string, ResourceType]>(resource => [resource.type, resource]);
            const targetResourceTypes = target.resources.map<[string, ResourceType]>(resource => [resource.type, resource]);
            const targetResourceTypeMap = new Map<string, ResourceType>(targetResourceTypes);
            const playerResourceTypeMap = new Map<string, ResourceType>(playerResourceTypes);
            const resourceCostMap = new Map<string, ResourceType>(); 
            gameState.selectedComponents.map(([, value]) => value.price)
                .forEach((resource, index) => {
                    const currentAmount = resourceCostMap.get(resource[index].type)?.amount || 0;
                    resourceCostMap.set(
                        resource[index].type, 
                        resourceCostMap.get(resource[index].type) || {...resource[index], amount: currentAmount + resource[index].amount}
                    )
                })
            
            const errorMessages: ErrorType[] = [];
            for(let i = 0; i > resourceCostMap.size; i--) {
                const resourceToPay = resourceCostMap.values().next().value;
                if(resourceToPay) {
                    const playerResourceType = playerResourceTypeMap.get(resourceToPay.type);
                    const targetResourceType = targetResourceTypeMap.get(resourceToPay.type);
                    if(playerResourceType && ((playerResourceType.amount > resourceToPay.amount) || playerResourceType?.allowNegativeAmount)) {
                        playerResourceTypeMap.set(resourceToPay.type, { ...resourceToPay, amount: playerResourceType.amount - resourceToPay.amount })
                        targetResourceTypeMap.set(resourceToPay.type, { ...resourceToPay, amount: (targetResourceType?.amount || 0) + resourceToPay.amount })
                    }
                    else { errorMessages.push({ errorCode: ERROR_CODE_ENUM.NOT_ENOUGH_RESOURCES, message: `You don't have enough ${resourceToPay.type}` }) }
                }
                else {
                    errorMessages.push({ errorCode: ERROR_CODE_ENUM.LOGICAL_ERROR, message: `${payResourceTypes.name} FAILED` })
                }
            }
            if(checkIfErrorsExist(errorMessages)) {
                performance.mark('end');
                return { ...gameState, errors: errorMessages }
            }
            else {
                const newOwnerResourceTypes: ResourceType[] = Array.from(playerResourceTypeMap.values());
                const newTargetResourceTypes: ResourceType[] = Array.from(targetResourceTypeMap.values());
                const ownerArray = Array.from(owners);
                owner.resources = newOwnerResourceTypes;
                target.resources = newTargetResourceTypes;
                const newGameState = { ...gameState, owners: ownerArray };
                performance.mark('end');
                
                return newGameState
            }
        }
        performance.mark('end');
        const performanceTime = performance.measure(payResourceTypes.name, 'start', 'end');
        console.log(performanceTime);
        return gameState;
    }

    const playGC = (gs: GameState, action: ActionType): GameState => {
        const newSelected = gs.selectedComponents.map(([key,gc]) => {
            const updatedGC: GameComponentType = {
                ...gc,
                state: GAME_COMPONENT_STATE_ENUM.IN_PLAY
            }
            return [key, updatedGC] as [typeof key, typeof updatedGC];
        }); 
        
            return { ...gs, selectedComponents: newSelected }
    }

    const deleteActionsFromGameState = (deletedActions: ActionArray) => {
        if(gameState && updateGS) {
           const newArray : ActionArray = [];
            gameState.actions.forEach((action) => {
            const isIncluded = deletedActions.includes(action);
            if(isIncluded) {
                newArray.push(action)
            }
            })
            updateGS({ ...gameState, actions: newArray }) 
        }
    }

    const finishAction = (gs: GameState ,action: ActionType) => {
        // if(action.automatic) {
        //     socket.emit('updateGameState', gs, state => {
        //         if(state == SOCKET_RESPONSE.OK) {
        //             console.log('ACTION FINISHED');
        //         }
        //     })
        // }
        setWaitingToConfirm(true);
    }


    return { addActionsToGameState, deleteActionsFromGameState, actionReducer, waitingToConfirm, setWaitingToConfirm }  
}