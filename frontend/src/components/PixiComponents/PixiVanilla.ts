import { BaseType, GameComponentType, VisualType } from "@shared/types/types";
import { Texture, Text, Application, ContainerChild, Graphics, Container, Sprite, Matrix, Point, ObservablePoint } from "pixi.js";
import "@pixi/layout";
import { setSelectedPixiContainer, setStageEventContext, StageEventContext } from "@root/src/zustand/PixiStore";
import { set } from "animejs";

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


export const createPixiComponent = (baseNode: BaseType<VisualType>): ContainerWithID => {
    const container = new Container({layout: {
            width: baseNode.width || 100,
            height: baseNode.height || 100,
        }
    });
    container.label = createPixiLabelFromBaseType(baseNode, PIXI_COMPONENTS.CONTAINER);
    const backgroundGraphic = new Graphics();
    backgroundGraphic.rect(
        0, 
        0,
        baseNode.width || 100, 
        baseNode.height || 100).fill(baseNode.fill || 'black'
    );
    container.addChild(backgroundGraphic);
    return { id: baseNode.id, container };
}

export const createTransformer = (bindTo: Container, app: Application): Graphics[] => {
    // Transformer handles styles
    if(!app.stage) return [];
    const handleSize = 12;
    const halfOfHandle = handleSize / 16;
    const handleColor = 'silver';
    const borderColor = 'darkred'
    // Initialize graphics for handles
    const handle_size = new Graphics();
    const handle_height = new Graphics();
    const handle_width = new Graphics();
    const border = new Graphics();
    const container = new Container();
    if(!bindTo.layout?.computedLayout) return [];
    const bindedLayout = bindTo.layout.computedLayout;
    // Draw handles
    handle_size.circle(0, 0, handleSize).fill(handleColor).cursor = 'nesw-resize';
    handle_size.x = bindedLayout.left + bindedLayout.width - halfOfHandle;
    handle_size.y = bindedLayout.top - halfOfHandle;
    handle_height.circle(0, 0, handleSize).fill(handleColor).cursor = 'ns-resize';
    handle_height.x = bindedLayout.left + bindedLayout.width / 2 - halfOfHandle;
    handle_height.y = bindedLayout.top - halfOfHandle;
    handle_width.circle(0, 0, handleSize).fill(handleColor).cursor = 'ew-resize';
    handle_width.x = bindedLayout.left + bindedLayout.width - halfOfHandle;
    handle_width.y = bindedLayout.top + bindedLayout.height / 2 - halfOfHandle;
    // Draw border
    border.rect(bindedLayout.left, bindedLayout.top, bindedLayout.width, bindedLayout.height).stroke({ width: 1, color: borderColor });
    const handleArray = [handle_size, handle_height, handle_width, border];
    // Add listeners
    console.log('bindTo.layout', bindTo.layout?.computedPixiLayout);
    handle_size.interactive = true;
    handle_height.interactive = true;
    handle_width.interactive = true;
    handleArray.forEach((handle, index) => { 
        handle.on('pointerdown', (event) => {
            setSelectedPixiContainer(handle);
            event.currentTarget.scale.set(1.2);
            app.stage.eventMode = 'static';
            console.log('handle.x', handle.x, 'handle.y', handle.y);
            app.stage.on('pointermove', (e) => {
                const newPos = handle.parent?.toLocal(e.global, undefined, handle.position);
                console.log('newpos', newPos);
            });
            app.stage.on('pointerup', (e) => {
                app.stage.off('pointermove');
                app.stage.off('pointerup');
                console.log('cleared app stage events from transformer handle');
                handle.scale.set(1)
            });
            // app.stage.on('pointerout', (e) => {
            //     app.stage.off('pointermove');
            //     app.stage.off('pointerup');
            //     app.stage.off('pointerout');
            // });
        });
    });

    return handleArray;
}

export const initPixiApp = async(divContainer: HTMLDivElement) => {
    const app = new Application();
    await app.init({ resizeTo: divContainer || window, backgroundColor: 'blue' });
    return app;
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