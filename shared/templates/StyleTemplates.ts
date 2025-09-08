import { VisualType } from "@shared/types/types";

export const CARD_TEMPLATE: Partial<VisualType> = {
    x: 0,
    y: 0,
    width: 150,
    height: 200,
    fill: 'white',
};

export const MEEPLE_TEMPLATE: Partial<VisualType> = {
    width: 100,
    height: 100,
    fill: 'darkblue',
};

export const GAMEBOARD_TEMPLATE: Partial<VisualType> = {
    width: 400,
    height: 100,
    fill: 'green',
}