import { GAME_COMPONENT_STATE_ENUM, TYPE_ENUM } from "@shared/enums/enums";
import { BlueprintType, ConfigType, GameComponentType, OwnerType, PlayAreaType } from "@shared/types/types";
import { Game } from "boardgame.io";

interface DrawCardAction {
    (G: BlueprintType, ctx: any, deckId: string): BlueprintType;
}
interface PlayCardAction {
    (G: BlueprintType, ctx: any, cardId: string, targetArea: PlayAreaType): BlueprintType;
}


export const createComponentPlayAreaLinks = (gameComponents: GameComponentType[], playAreas: PlayAreaType[], config?: ConfigType): Map<PlayAreaType['id'], GameComponentType> => {
    const componentArray = [...gameComponents];
    const playAreaMap: Map<PlayAreaType['id'], GameComponentType> = new Map();
    playAreas.forEach((playArea, index) => {
        if(typeof config?.pickAction === 'number') {
            playAreaMap.set(playArea.id, componentArray[config.pickAction]);
        }
        if (config?.pickAction === 'last') {
            playAreaMap.set(playArea.id, componentArray.pop()!);
        }
        if (config?.pickAction === 'first') {
            playAreaMap.set(playArea.id, componentArray[0]);
        }
        if (config?.pickAction === 'random') {
            const randomIndex = Math.floor(Math.random() * componentArray.length);
            playAreaMap.set(playArea.id, componentArray[randomIndex]);
        }
        playAreaMap.set(playArea.id, componentArray[0]);
    });

    return playAreaMap;
}

export const createComponentOwner = (gameComponent: GameComponentType, newOwner: OwnerType): Map<OwnerType['id'], GameComponentType> => {
    const ownerMap = new Map<OwnerType['id'], GameComponentType>();
    ownerMap.set(newOwner.id, gameComponent);
    return ownerMap;
}

export const populatePlayAreasWithGameComponents = (gameComponents: GameComponentType[], playAreas: PlayAreaType[], config?: ConfigType) => {
    
}

// Boardgame.io moves
export const drawCard: DrawCardAction = (G, ctx, deckId) => {
    const newG = { ...G };
    const currentPlayer = ctx.currentPlayer;
    
    // Find a card in the deck
    const cardIndex = newG.gameComponents.findIndex(([id, component]) => 
        component.ownerId === deckId
    );
    
    if (cardIndex === -1) return G;
    
    // Move card to player's hand
    const [cardId, card] = newG.gameComponents[cardIndex];
    const updatedCard = {
        ...card,
        ownerId: currentPlayer,
    };
    
    newG.gameComponents = [...newG.gameComponents];
    newG.gameComponents[cardIndex] = [cardId, updatedCard];
    
    return newG;
};

export const playCard: PlayCardAction = (G, ctx, cardId, targetArea): BlueprintType => {
    const newG = { ...G };
    const currentPlayer = ctx.currentPlayer;
    
    // Find the card
    const cardIndex = newG.gameComponents.findIndex(([id]) => id === cardId);
    if (cardIndex === -1) return G;
    
    const [id, card] = newG.gameComponents[cardIndex];
    
    // Check if player owns the card
    if (card.ownerId !== currentPlayer) return G;
    
    // Play the card
    const updatedCard = {
        ...card,
        ownerId: targetArea.id,
    };
    
    newG.gameComponents = [...newG.gameComponents];
    newG.gameComponents[cardIndex] = [id, updatedCard];
    
    return newG;
};