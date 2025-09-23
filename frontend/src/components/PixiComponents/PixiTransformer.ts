import { Application, Container, Graphics } from "pixi.js";

export type CustomPixiTransformer = {
    handle_size: Graphics,
    handle_height: Graphics,
    handle_width: Graphics,
    border: Graphics
}


export const createTransformer = (parentContainer: Container, app: Application): CustomPixiTransformer | null => {
    // Transformer handles styles
    if(!app.stage) return null
    const sizeOfHandle = 10;
    const halfOfHandle = sizeOfHandle / 16;
    const handleColor = 'silver';
    const borderColor = 'darkred'
    // Initialize graphics for handles
    const handle_size = new Graphics();
    const handle_height = new Graphics();
    const handle_width = new Graphics();
    const border = new Graphics().rect(0,0,100, 100).stroke({width: 2, color: 'black', alignment: 1, pixelLine: true});
    // Get binded element layout
    if(!parentContainer.layout?.computedPixiLayout || !parentContainer.layout?.computedLayout) return null;
    const bindedPixiLayout = parentContainer.layout.computedPixiLayout;
    const bindedYogaLayout = parentContainer.layout.computedLayout;
    // Draw handles
    handle_size.circle(0, 0, sizeOfHandle).fill(handleColor).cursor = 'nesw-resize';
    handle_size.position.set(bindedPixiLayout.x + bindedYogaLayout.width - halfOfHandle, bindedPixiLayout.y - halfOfHandle);
    handle_height.circle(0,0, sizeOfHandle).fill(handleColor).cursor = 'ns-resize';
    handle_height.position.set(bindedPixiLayout.x + bindedYogaLayout.width / 2 - halfOfHandle, bindedPixiLayout.y - halfOfHandle);
    handle_width.circle(0,0, sizeOfHandle).fill(handleColor).cursor = 'ew-resize';
    handle_width.position.set(bindedPixiLayout.x + bindedYogaLayout.width - halfOfHandle, bindedPixiLayout.y + bindedYogaLayout.height / 2 - halfOfHandle);
    // Draw border
    border.layout = {
        position: 'absolute',
        width: "100%",
        height: "100%",
    }
    // Add listeners
    handle_size.interactive = true;
    handle_height.interactive = true;
    handle_width.interactive = true;
    handle_size.on('pointerdown', (event) => {
            parentContainer.addChild(border);
            handle_size.alpha = 0.8;
            app.stage.eventMode = 'static';
            app.stage.hitArea = app.screen;
            app.stage.on('pointermove', (e) => {
                const obsPoint = handle_size.position.copyFrom(e.global);
                const newWidth = obsPoint.x - (parentContainer.layout?.computedPixiLayout.x || 0);
                const newHeight = ((parentContainer.layout?.computedLayout.height || 0) + (parentContainer.layout?.computedLayout.top || 0)) - obsPoint.y;
                parentContainer.layout = {
                    width: newWidth,
                    height: newHeight
                };
            });
            app.stage.on('pointerup', (e) => {
                app.stage.off('pointermove');
                app.stage.off('pointerup');
                e.target.alpha = 1;
                parentContainer.removeChild(border);
            });
    });

    return { handle_size, handle_height, handle_width, border};
}

export const createSizeHandler = (container: Container, app: Application, onPointerMove?: () => void) => {
    const size = 10;
    const color = 'grey';
    const halfOfHandle = size / 16;
    const sizeHandler = new Graphics();
    sizeHandler.circle(0, 0, size).fill(color).cursor = 'nesw-resize';
    sizeHandler.position.set(
        (container.layout?.computedPixiLayout.x || 0) + (container.layout?.computedLayout.width || 0) - halfOfHandle, 
        (container.layout?.computedPixiLayout.y || 0) - halfOfHandle
    );
    sizeHandler.interactive = true;
    app.stage.eventMode = 'static';
    app.stage.hitArea = app.screen;
    sizeHandler.on('pointerdown', (event) => {
        sizeHandler.alpha = 0.8;
        app.stage.on('pointermove', (e) => {
            const obsPoint = sizeHandler.position.copyFrom(e.global);
            const newWidth = obsPoint.x - (container.layout?.computedPixiLayout.x || 0);
            const newHeight = ((container.layout?.computedLayout.height || 0) + (container.layout?.computedLayout.top || 0)) - obsPoint.y;
            container.layout = {
                width: newWidth,
                height: newHeight
            };
            onPointerMove && onPointerMove();
        });
        app.stage.on('pointerup', (e) => {
            app.stage.off('pointermove');
            app.stage.off('pointerup');
            e.target.alpha = 1;
        });
    })

    return sizeHandler;
}