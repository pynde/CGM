import * as ContextMenu from '@radix-ui/react-context-menu';
import { useAddToView, useGetViews, useResetGameViews } from '@root/src/zustand/GameViewStore';
import React, { useEffect } from 'react';
import { Stage, Layer, Rect, Text, Group } from 'react-konva';
import ActionEffectMenu from '../../ContextMenu/BlueprintMenu';
import GridSelection from '../GridSelection/GridSelection';
import { BlueprintType } from '@shared/types/types';
import GameComponent from '../../GameComponent/GameComponent';

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
            <Stage width={width} height={height} style={{backgroundColor: 'yellow', width, height}}>
                <Layer>
                    <GridSelection width={width} height={height}/>
                    {items.map((item, idx) => (
                        <GameComponent 
                            type={item.type}
                            id={item.id + idx}
                            name={item.name}
                            style={item.style}
                            renderAs={'konva'}
                            showTitle={true} 
                            actions={item.actions}
                            price={item.price} 
                            ownerId={item.ownerId}                            
                        />
                    ))}
                </Layer>      
            </Stage>
        </ContextMenu.Trigger>
        <ActionEffectMenu/>
        </ContextMenu.Root>
        </>
    );
};

export default GameView;