import React, { useEffect, useImperativeHandle, useRef } from 'react';
import { GameComponentType, isTypeOf } from '@shared/types/types';
import Konva from 'konva';
import { Group, Image, Text } from 'react-konva';

export type GameComponentRenderProps = {
    draggable?: boolean;
    renderAs: 'konva' | 'html';
    showTitle?: boolean;
    ref?: React.RefObject<Konva.Group>;
    handleTransformEnd?: (e: Konva.KonvaEventObject<Event>) => void;
    children?: React.ReactNode;
}

type GameComponentProps = GameComponentRenderProps & GameComponentType;

const GameComponent: React.FC<GameComponentProps> = ({ref, ...props}) => {

    const buildKonvaComponent = () => {
        if(props.renderAs !== 'konva') return null;
        return (
        <Group 
            ref={ref as React.RefObject<Konva.Group>} 
            draggable={props.draggable} 
            id={props.id}
            onTransformEnd={props.handleTransformEnd}
            width={props.style?.width}
            height={props.style?.height}
            >
            <Image {...props.style} image={undefined} />
            {props.showTitle &&
            <Text {...props.style} fontFamily='Futura' align='center' fill={'black'} text={props.name}/>
            }
        </Group>
        )
    }

    const buildHtmlComponent = () => {
        if(props.renderAs !== 'html') return null;
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
        buildKonvaComponent() || buildHtmlComponent()
    );
};

export default GameComponent;