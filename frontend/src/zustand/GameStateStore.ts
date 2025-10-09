import { create } from 'zustand';
import { BlueprintType } from '../../../shared/types/types';
import { TYPE_ENUM, GAME_COMPONENT_STATE_ENUM } from '../../../shared/enums/enums';
import { drawCard, playCard } from '../game/GameActions';

// Initial blueprint state
const createInitialBlueprint = (): BlueprintType => ({
    gameComponents: [],
    resources: [],
    actions: [],
    effects: [],
    playAreas: []
});



// Store interface
type GameStateStore = {
    G: BlueprintType;
    ctx: {
        currentPlayer: string;
        phase: string;
        turn: number;
        numPlayers: number;
    };
    moves: {
        drawCard: typeof drawCard;
        playCard: typeof playCard;
    };
}

export const useGameStateStore = create<GameStateStore>()(() => ({
    G: createInitialBlueprint(),
    ctx: {
        currentPlayer: '0',
        phase: 'play',
        turn: 0,
        numPlayers: 2,
    },
    moves: {
        drawCard,
        playCard
    }
}));

export default useGameStateStore;
