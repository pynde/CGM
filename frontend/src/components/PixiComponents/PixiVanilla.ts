import { BaseType, PlayAreaType, VisualType } from "@shared/types/types";
import { Text, Application, ContainerChild, Graphics, Container, Point, Color } from "pixi.js";


export enum PIXI_COMPONENTS {
    CONTAINER = 'container',
    TRANSFORMER = 'transformer',
    SPRITE = 'sprite',
    TEXT = 'text',
    GRAPHICS = 'graphics',
}

export type ContainerWithID = {
    id: string,
    container: Container
}

export const createPixiLabelFromBaseType = (basetype: BaseType, componentType: PIXI_COMPONENTS) => componentType + basetype.name + basetype.id;



export const createPixiComponent = (baseNode: BaseType<VisualType>): Container => {
    const container = new Container({layout: {
            width: baseNode.width || 100,
            height: baseNode.height || 100,
        }
    });
    container.label = createPixiLabelFromBaseType(baseNode, PIXI_COMPONENTS.CONTAINER);
    const bgColor = new Graphics({layout: {
            width: "100%",
            height: "100%",
        }
    });
    bgColor.rect(
        0, 
        0,
        baseNode.width || 100, 
        baseNode.height || 100).fill(baseNode.fill || 'black').stroke({width: 2, color: 'darkred', alignment: 1, pixelLine: true});
    container.addChild(bgColor);
    return container;
};

export const createPlayArea = (playArea: PlayAreaType) => {
    const container = new Container ({ 
        layout: {
                width: playArea.style?.width || 0, 
                height: playArea?.style?.height || 0,
                top: playArea.style?.y || 0,
                left: playArea.style?.x || 0,
                } 
        })
    if(playArea.style?.fill) {
        const bgGraphics = new Graphics();
        bgGraphics.rect(0, 0, playArea.style?.width || 0, playArea.style?.height || 0).fill(playArea.style.fill);
        bgGraphics.layout = {
            width: "100%",
            height: "100%",
            position: 'absolute',
            display: 'flex',
        }
        bgGraphics.interactive = false;
        container.addChild(bgGraphics);
    }
     return container
}

const createPixiErrorContainer = (from?: string) => {
    const container = new Container({layout: {
            width: 100,
            height: 100,
        }
    });
    console.warn('created error container from: ', from );
    const text = new Text('Error loading component', { fill: 'red', fontSize: 14 });
    text.layout = {
        width: "100%",
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center',
    }
    container.addChild(text);
    return container
}
export const appendToPixiApp = (app: Application, element: ContainerChild) => {
    app.stage.addChild(element);
}

const initStageEvents = (stage: Container) => {
    let dragging = false;
    stage.on('pointerdown', (event) => {
        dragging = true;
    });
}

// Transform methods

 
const resizePixiComponent = (container: Container, globalPointer: Point, newWidth: number, newHeight: number) => {
    container.height = newHeight;
    container.width = newWidth;
};

const movePixiComponent = (container: Container, newX: number, newY: number) => {
    container.x = newX;
    container.y = newY;
}

const setWidth = (container: Container, newWidth: number) => {

}