import { GAME_COMPONENT_STATE_ENUM, TYPE_ENUM } from "@shared/enums/enums";
import { BlueprintType, PlayAreaType } from "@shared/types/types";

interface DrawCardAction {
    (G: BlueprintType, ctx: any, deckId: string): BlueprintType;
}
interface PlayCardAction {
    (G: BlueprintType, ctx: any, cardId: string, targetArea: PlayAreaType): BlueprintType;
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