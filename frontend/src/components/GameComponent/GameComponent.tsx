import React, { useEffect, useImperativeHandle, useRef } from 'react';
import { GameComponentType, isTypeOf } from '@shared/types/types';
export type GameComponentRenderProps = {
    showTitle?: boolean;
    ref?: React.RefObject<HTMLDivElement>;
    handleTransformEnd?: (e: MouseEvent) => void;
    children?: React.ReactNode;
}

type GameComponentProps = GameComponentRenderProps & GameComponentType;

const GameComponent: React.FC<GameComponentProps> = ({ref, ...props}) => {


    const buildHtmlComponent = () => {
        return (
            <div style={{ left: props.style?.x, top: props.style?.y, width: props.style?.width, height: props.style?.height, backgroundColor: props.style?.fill }} className='game-component'>
                { 
                props.showTitle &&
                    <span className='text-lg font-bold text-center'>{props.name}</span>
                }
            </div>
        );
    }

    return (
        buildHtmlComponent()
    );
};

export default GameComponent;