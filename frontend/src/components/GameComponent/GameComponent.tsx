import React from 'react';
import { GameComponentType } from '@shared/types/types';
import { Group, Image, Rect, Text } from 'react-konva';

export type GameComponentRenderProps = {
    draggable?: boolean;
    renderAs: 'konva' | 'html';
    showTitle?: boolean;
}

type GameComponentProps = GameComponentRenderProps & GameComponentType;

const GameComponent: React.FC<GameComponentProps> = (props: GameComponentProps) => {

    const buildKonvaComponent = () => {
        if(props.renderAs !== 'konva') return null;
        return (
        <Group draggable={props.draggable} id={props.id}>
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