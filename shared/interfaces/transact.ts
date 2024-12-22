import { GameComponent, ResourceType, Transactionable } from "@shared/types/types"




const _transactTo = (object: ResourceType | GameComponent, to: Transactionable) : Promise<ResourceType | GameComponent> => {
    const traPromise = new Promise<ResourceType|GameComponent>((resolve, reject) => {
        try {
            resolve(object)
        }
        catch {
            reject('Could not resolve transaction')
        }
    })
    return traPromise
}

export const isTransactionable = (x: any) : x is Transactionable => {
    return x
}   