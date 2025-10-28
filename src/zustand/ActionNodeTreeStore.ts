import { ActionType } from '@shared/types/types';
import { create } from 'zustand';

type ActionTreeNode = ActionType & { group?: string }

type ActionNodeTreeState = {
    nodes: Map<string, ActionTreeNode>;
    addNode: (node: ActionTreeNode) => void;
    removeNode: (actionId: string) => void;
    removeFromGroup: (group: string) => void;
    moveNodeToGroup: (actionId: string, group: string) => void;
};

const useActionNodeTreeStore = create<ActionNodeTreeState>((set, get) => ({
    nodes: new Map<string, ActionTreeNode>(),

    addNode: (node) => set((state) => {
        const nodes = new Map(state.nodes);
        nodes.set(node.id, node);
        return { nodes };
    }),

    removeNode: (actionId) => set((state) => {
        const nodes = new Map(state.nodes);
        nodes.delete(actionId);
        return { nodes };
    }),

    removeFromGroup: (group) => set((state) => {
        const nodes = new Map(state.nodes);
        for (const [id, node] of nodes) {
            if (node.group === group) {
                nodes.set(id, { ...node, group: undefined });
            }
        }
        return { nodes };
    }),

    moveNodeToGroup: (actionId, group) => set((state) => {
        const nodes = new Map(state.nodes);
        const node = nodes.get(actionId);
        if (node) {
            nodes.set(actionId, { ...node, group });
        }
        return { nodes };
    }),
}));

export const useActionTreeNodes = () => useActionNodeTreeStore((state) => state.nodes);
export const addToActionNodeTree = useActionNodeTreeStore.getState().addNode;
export const removeFromActionNodeTree = useActionNodeTreeStore.getState().removeNode;
export const removeFromActionNodeTreeGroup = useActionNodeTreeStore.getState().removeFromGroup;
export const moveNodeToActionNodeTreeGroup = useActionNodeTreeStore.getState().moveNodeToGroup;

