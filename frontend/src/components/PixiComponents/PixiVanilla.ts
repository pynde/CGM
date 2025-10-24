import { BaseType, BlueprintType, PlayAreaType, VisualType } from "@shared/types/types";
import { Text, Application, ContainerChild, Graphics, Container, Point, Color, FederatedPointerEvent, GraphicsContext } from "pixi.js";


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



export const createPixiComponent = (baseNode: BaseType & VisualType): Container => {
    const container = new Container({layout: {
            width: baseNode.width || 100,
            height: baseNode.height || 100,
        }
    });
    container.label = createPixiLabelFromBaseType(baseNode, PIXI_COMPONENTS.CONTAINER);
    if(baseNode) {
        console.log('baseNode', baseNode);
        const bgColorContext = new GraphicsContext();    
        bgColorContext.rect(
            0, 
            0,
            baseNode.width || 100, 
            baseNode.height || 100).fill(baseNode.fill || 'black').stroke({width: 2, color: 'darkred', alignment: 1, pixelLine: true});
        const bgColor = new Graphics(bgColorContext);
        bgColor.layout = {
            width: "100%",
            height: "100%",
            position: 'absolute',
        }
        container.addChild(bgColor);
    }

    return container;
};



export const toggleGraphics = (graphics: Graphics, toggle: boolean, componentStyle?: VisualType) => {
        const bounds = graphics.getLocalBounds();
        const stroke = graphics.strokeStyle;
        console.log('bounds', bounds);
        const newContext = new GraphicsContext().rect(bounds.x, bounds.y, bounds.width, bounds.height).fill(toggle ? 'red': componentStyle?.fill).stroke(stroke);
        graphics.context = newContext;
}

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

export const initPixiGameUI = (app: Application, blueprint: BlueprintType) => {
    // Create playAreas
    const playAreas = blueprint.playAreas.map(([,playArea]) =>  createPlayArea(playArea));
    // Create game components
    const gameComponents = blueprint.gameComponents.map(([,gameComponent]) => createPixiComponent(gameComponent));
    

}