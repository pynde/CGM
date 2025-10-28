import { KonvaEventObject, NodeConfig } from "konva/lib/Node";
import React from "react";
import { KonvaNodeComponent, Layer, Rect } from "react-konva";

type BoxSelectionProps = {
    renderAs: 'konva' | 'html';
    useBoxSelection?: boolean;
    rectStyle: NodeConfig
    onMouseUp?: (event: KonvaEventObject<MouseEvent> | React.MouseEvent<HTMLDivElement>) => void;
}

export const BoxSelection: React.FC<BoxSelectionProps> = (props: BoxSelectionProps) => {


    if (props.renderAs === 'konva') {
        return (
                <Rect
                    x={props.rectStyle.x}
                    y={props.rectStyle.y}
                    width={props.rectStyle.width}
                    height={props.rectStyle.height}
                    fill={props.rectStyle.fill || 'rgba(50, 50, 80, 0.4)'}
                    stroke="blue"
                    strokeWidth={1}
                />
        );
    } else {
        return (
            <div className="box-selection">
                {/* HTML specific rendering can go here */}
            </div>
        );
    }
}