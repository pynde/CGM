import * as ContextMenu from '@radix-ui/react-context-menu';
import { useAddToView, useGetViews, useResetGameViews } from '@root/src/zustand/GameViewStore';
import React, { useEffect } from 'react';
import ActionEffectMenu from '../BlueprintMenu/BlueprintMenu';
import GridSelection from './GridSelection';
import { BlueprintType } from '@shared/types/types';
import GameComponent from '../GameComponent/GameComponent';

type GameViewProps = {
    width?: number;
    height?: number;
    blueprint: BlueprintType
    children?: React.ReactNode;
}

const baseSize = 80;
// There are 16 columns
const widthBySixteen = 16 * baseSize;
// There are 9 rows
const heightByNine = 9 * baseSize;

const GameView: React.FC<GameViewProps> = ({ width= widthBySixteen, height=heightByNine, blueprint }) => {
    useEffect(() => {
        useResetGameViews();
        blueprint.gameComponents.forEach((component) => {
            useAddToView(component[1]);
        });
    }, [blueprint]);

    const items = useGetViews();

    return (
        <>
        <ContextMenu.Root modal={true}>
            <ContextMenu.Trigger>
            </ContextMenu.Trigger>
            <ActionEffectMenu/>
        </ContextMenu.Root>
        </>
    );
};

export default GameView;