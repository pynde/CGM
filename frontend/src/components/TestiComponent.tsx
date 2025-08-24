import Konva from 'konva';
import React from 'react';
import { Rect } from 'react-konva';

type TestiComponentProps = {
    ref?: React.RefObject<Konva.Rect>;
    children?: React.ReactNode;
};

function TestiComponent({ ref, ...props }: TestiComponentProps) {
    return (
        <Rect ref={ref} width={100} height={100} style={{ backgroundColor: 'darkcyan', width: '200px', height: '200px' }}>
        </Rect>
    );
}

export default TestiComponent;