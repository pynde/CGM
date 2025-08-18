import { BaseType, GameComponentType, VisualType } from '@shared/types/types';
import React from 'react';
import { GameComponentRenderProps } from './GameComponent';
import { Text } from 'react-konva';

type NameProps = 
    GameComponentRenderProps &
    VisualType &
    Pick<BaseType, 'name'>;

const Name: React.FC<NameProps> = (props: NameProps) => {
    if(props.renderAs === 'konva') {
        return (
        <Text x={props.x} y={props.y} width={props.width} height={props.height} fill={props.fill}>{props.name}</Text>
    );
    }
    else {
        return (
            <div style={{ position: 'absolute', left: props.x, top: props.y, backgroundColor: props.fill, width: props.width, height: props.height }}>
                {props.name}
            </div>
        );
    }
};

export default Name;