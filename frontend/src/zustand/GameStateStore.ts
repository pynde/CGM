import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { 
    GameState, 
    PlayerType, 
    Owner, 
    GameComponentType, 
    ActionType, 
    ErrorType, 
    ResourceType,
    SelectedArray,
    OwnerArray,
    ActionArray,
    isGameStateType
} from '@shared/types/types';
import { 
    GAME_STATE_ENUM, 
    ERROR_CODE_ENUM, 
    TYPE_ENUM,
    GAME_COMPONENT_STATE_ENUM 
} from '@shared/enums/enums';

// Initial game state
const createInitialGameState = (): GameState => ({
    type: GAME_STATE_ENUM.GAME_STATE_TYPE,
    players: [],
    owners: [],
    selectedComponents: [],
    actions: [],
    activePlayer: '',
    errors: []
});

// Store interface extending the base GameState
interface GameStateStore extends GameState {
    // State management actions
    setGameState: (gameState: Partial<GameState>) => void;
    resetGameState: () => void;
    
    // Player management
    addPlayer: (player: PlayerType) => void;
    removePlayer: (playerId: string) => void;
    updatePlayer: (playerId: string, updates: Partial<PlayerType>) => void;
    setActivePlayer: (playerId: string) => void;
    getPlayer: (playerId: string) => PlayerType | undefined;
    
    // Owner management
    addOwner: (owner: Owner) => void;
    removeOwner: (ownerId: string) => void;
    updateOwner: (ownerId: string, updates: Partial<Owner>) => void;
    getOwner: (ownerId: string) => Owner | undefined;
    
    // Game component management
    addGameComponent: (component: GameComponentType, ownerId?: string) => void;
    removeGameComponent: (componentId: string) => void;
    updateGameComponent: (componentId: string, updates: Partial<GameComponentType>) => void;
    moveGameComponent: (componentId: string, fromOwnerId: string, toOwnerId: string) => void;
    getGameComponent: (componentId: string) => GameComponentType | undefined;
    getGameComponentsByOwner: (ownerId: string) => GameComponentType[];
    
    // Resource management
    addResourceToOwner: (ownerId: string, resource: ResourceType) => void;
    removeResourceFromOwner: (ownerId: string, resourceId: string) => void;
    updateOwnerResource: (ownerId: string, resourceId: string, updates: Partial<ResourceType>) => void;
    transferResource: (fromOwnerId: string, toOwnerId: string, resourceId: string, amount?: number) => void;
    
    // Selection management
    selectComponent: (componentId: string, component: GameComponentType) => void;
    deselectComponent: (componentId: string) => void;
    clearSelection: () => void;
    isComponentSelected: (componentId: string) => boolean;
    
    // Action management
    addAction: (action: ActionType) => void;
    removeAction: (actionId: string) => void;
    updateAction: (actionId: string, updates: Partial<ActionType>) => void;
    executeAction: (actionId: string) => void;
    clearActions: () => void;
    
    // Error management
    addError: (error: ErrorType) => void;
    removeError: (index: number) => void;
    clearErrors: () => void;
    
    // Utility functions
    findComponentInOwners: (componentId: string) => { owner: Owner; component: GameComponentType } | undefined;
    validateGameState: () => boolean;
    getGameStateSnapshot: () => GameState;
}

export const useGameStateStore = create<GameStateStore>()(
    subscribeWithSelector((set, get) => ({
        ...createInitialGameState(),
        
        // State management actions
        setGameState: (gameState: Partial<GameState>) => {
            set((state) => ({ ...state, ...gameState }));
        },
        
        resetGameState: () => {
            set(createInitialGameState());
        },
        
        // Player management
        addPlayer: (player: PlayerType) => {
            set((state) => ({
                players: [...state.players, player]
            }));
        },
        
        removePlayer: (playerId: string) => {
            set((state) => ({
                players: state.players.filter(p => p.id !== playerId),
                activePlayer: state.activePlayer === playerId ? '' : state.activePlayer
            }));
        },
        
        updatePlayer: (playerId: string, updates: Partial<PlayerType>) => {
            set((state) => ({
                players: state.players.map(p => 
                    p.id === playerId ? { ...p, ...updates } : p
                )
            }));
        },
        
        setActivePlayer: (playerId: string) => {
            set({ activePlayer: playerId });
        },
        
        getPlayer: (playerId: string) => {
            return get().players.find(p => p.id === playerId);
        },
        
        // Owner management
        addOwner: (owner: Owner) => {
            set((state) => ({
                owners: [...state.owners, [owner.id, owner]]
            }));
        },
        
        removeOwner: (ownerId: string) => {
            set((state) => ({
                owners: state.owners.filter(([id]) => id !== ownerId)
            }));
        },
        
        updateOwner: (ownerId: string, updates: Partial<Owner>) => {
            set((state) => ({
                owners: state.owners.map(([id, owner]) => 
                    id === ownerId ? [id, { ...owner, ...updates }] : [id, owner]
                )
            }));
        },
        
        getOwner: (ownerId: string) => {
            return get().owners.find(([id]) => id === ownerId)?.[1];
        },
        
        // Game component management
        addGameComponent: (component: GameComponentType, ownerId?: string) => {
            if (ownerId) {
                set((state) => ({
                    owners: state.owners.map(([id, owner]) => 
                        id === ownerId 
                            ? [id, { ...owner, gameComponents: [...owner.gameComponents, component] }]
                            : [id, owner]
                    )
                }));
            }
        },
        
        removeGameComponent: (componentId: string) => {
            set((state) => ({
                owners: state.owners.map(([id, owner]) => [
                    id,
                    {
                        ...owner,
                        gameComponents: owner.gameComponents.filter(c => c.id !== componentId)
                    }
                ]),
                selectedComponents: state.selectedComponents.filter(([id]) => id !== componentId)
            }));
        },
        
        updateGameComponent: (componentId: string, updates: Partial<GameComponentType>) => {
            set((state) => ({
                owners: state.owners.map(([id, owner]) => [
                    id,
                    {
                        ...owner,
                        gameComponents: owner.gameComponents.map(c => 
                            c.id === componentId ? { ...c, ...updates } : c
                        )
                    }
                ]),
                selectedComponents: state.selectedComponents.map(([id, component]) => 
                    id === componentId ? [id, { ...component, ...updates }] : [id, component]
                )
            }));
        },
        
        moveGameComponent: (componentId: string, fromOwnerId: string, toOwnerId: string) => {
            const component = get().findComponentInOwners(componentId);
            if (component) {
                // Remove from source owner
                get().removeGameComponent(componentId);
                // Add to target owner
                get().addGameComponent(component.component, toOwnerId);
            }
        },
        
        getGameComponent: (componentId: string) => {
            return get().findComponentInOwners(componentId)?.component;
        },
        
        getGameComponentsByOwner: (ownerId: string) => {
            const owner = get().getOwner(ownerId);
            return owner?.gameComponents || [];
        },
        
        // Resource management
        addResourceToOwner: (ownerId: string, resource: ResourceType) => {
            set((state) => ({
                owners: state.owners.map(([id, owner]) => 
                    id === ownerId 
                        ? [id, { ...owner, resources: [...owner.resources, resource] }]
                        : [id, owner]
                )
            }));
        },
        
        removeResourceFromOwner: (ownerId: string, resourceId: string) => {
            set((state) => ({
                owners: state.owners.map(([id, owner]) => 
                    id === ownerId 
                        ? [id, { ...owner, resources: owner.resources.filter(r => r.id !== resourceId) }]
                        : [id, owner]
                )
            }));
        },
        
        updateOwnerResource: (ownerId: string, resourceId: string, updates: Partial<ResourceType>) => {
            set((state) => ({
                owners: state.owners.map(([id, owner]) => 
                    id === ownerId 
                        ? [id, { 
                            ...owner, 
                            resources: owner.resources.map(r => 
                                r.id === resourceId ? { ...r, ...updates } : r
                            )
                          }]
                        : [id, owner]
                )
            }));
        },
        
        transferResource: (fromOwnerId: string, toOwnerId: string, resourceId: string, amount?: number) => {
            const fromOwner = get().getOwner(fromOwnerId);
            const resource = fromOwner?.resources.find(r => r.id === resourceId);
            
            if (resource) {
                const transferAmount = amount || resource.amount;
                
                if (resource.amount >= transferAmount) {
                    // Update source resource
                    get().updateOwnerResource(fromOwnerId, resourceId, { 
                        amount: resource.amount - transferAmount 
                    });
                    
                    // Add resource to target owner
                    const transferResource = { ...resource, amount: transferAmount };
                    get().addResourceToOwner(toOwnerId, transferResource);
                    
                    // Remove resource if amount becomes 0
                    if (resource.amount - transferAmount <= 0) {
                        get().removeResourceFromOwner(fromOwnerId, resourceId);
                    }
                }
            }
        },
        
        // Selection management
        selectComponent: (componentId: string, component: GameComponentType) => {
            set((state) => ({
                selectedComponents: [...state.selectedComponents, [componentId, component]]
            }));
        },
        
        deselectComponent: (componentId: string) => {
            set((state) => ({
                selectedComponents: state.selectedComponents.filter(([id]) => id !== componentId)
            }));
        },
        
        clearSelection: () => {
            set({ selectedComponents: [] });
        },
        
        isComponentSelected: (componentId: string) => {
            return get().selectedComponents.some(([id]) => id === componentId);
        },
        
        // Action management
        addAction: (action: ActionType) => {
            set((state) => ({
                actions: [...state.actions, action]
            }));
        },
        
        removeAction: (actionId: string) => {
            set((state) => ({
                actions: state.actions.filter(a => a.id !== actionId)
            }));
        },
        
        updateAction: (actionId: string, updates: Partial<ActionType>) => {
            set((state) => ({
                actions: state.actions.map(a => 
                    a.id === actionId ? { ...a, ...updates } : a
                )
            }));
        },
        
        executeAction: (actionId: string) => {
            // Implementation would depend on your action execution logic
            const action = get().actions.find(a => a.id === actionId);
            if (action) {
                // Execute action logic here
                console.log(`Executing action: ${action.name}`);
            }
        },
        
        clearActions: () => {
            set({ actions: [] });
        },
        
        // Error management
        addError: (error: ErrorType) => {
            set((state) => ({
                errors: [...state.errors, error]
            }));
        },
        
        removeError: (index: number) => {
            set((state) => ({
                errors: state.errors.filter((_, i) => i !== index)
            }));
        },
        
        clearErrors: () => {
            set({ errors: [] });
        },
        
        // Utility functions
        findComponentInOwners: (componentId: string) => {
            const owners = get().owners;
            for (const [, owner] of owners) {
                const component = owner.gameComponents.find(c => c.id === componentId);
                if (component) {
                    return { owner, component };
                }
            }
            return undefined;
        },
        
        validateGameState: () => {
            const state = get();
            return isGameStateType(state);
        },
        
        getGameStateSnapshot: () => {
            const { 
                type, players, owners, selectedComponents, 
                actions, activePlayer, errors 
            } = get();
            return { 
                type, players, owners, selectedComponents, 
                actions, activePlayer, errors 
            };
        }
    }))
);

// Selector hooks for common patterns
export const useActivePlayer = () => 
    useGameStateStore((state) => 
        state.players.find(p => p.id === state.activePlayer)
    );

export const usePlayerById = (playerId: string) => 
    useGameStateStore((state) => 
        state.players.find(p => p.id === playerId)
    );

export const useOwnerById = (ownerId: string) => 
    useGameStateStore((state) => 
        state.owners.find(([id]) => id === ownerId)?.[1]
    );

export const useSelectedComponents = () => 
    useGameStateStore((state) => state.selectedComponents);

export const useGameErrors = () => 
    useGameStateStore((state) => state.errors);

export const useGameActions = () => 
    useGameStateStore((state) => state.actions);

// Helper function to create error
export const createError = (errorCode: ERROR_CODE_ENUM, message: string): ErrorType => ({
    errorCode,
    message
});

export default useGameStateStore;
