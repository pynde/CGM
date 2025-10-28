import { create } from 'zustand';
import { BlueprintType } from '@shared/types/types';
import { drawCard, playCard } from '../game/actions';

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

const populatePlayAreas = () => {
    const playAreas = useGameStateStore.getState().G.playAreas;
}

export default useGameStateStore;
