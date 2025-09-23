import { useEffect } from 'react';
import { Assets, FederatedPointerEvent, SCALE_MODES, Sprite } from 'pixi.js';
import React, {useRef} from 'react';
import { initPixiApp, usePixiApp } from '../zustand/PixiStore';

const PixiTesti: React.FC = () => {
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let dragTarget: Sprite | null = null;
        

        (async () => {        
            if(divRef.current === null) return;
            const pixiApp = await initPixiApp(divRef.current);
            divRef.current.appendChild(pixiApp.canvas);
            const texture = await Assets.load('https://pixijs.com/assets/bunny.png');

            for (let i = 0; i < 10; i++) {
                createBunny(
                    Math.floor(Math.random() * pixiApp.screen.width),
                    Math.floor(Math.random() * pixiApp.screen.height)
                );
            }

            function createBunny(x: number, y: number) {
                if(divRef.current === null || pixiApp === null) return;
                const bunny = new Sprite(texture);
                bunny.eventMode = 'static';
                bunny.cursor = 'pointer';
                bunny.anchor.set(0.5);
                bunny.scale.set(3);
                bunny.on('pointerdown', onDragStart, bunny);
                bunny.x = x;
                bunny.y = y;
            }

            pixiApp.stage.eventMode = 'static';
            pixiApp.stage.hitArea = pixiApp.screen;
            pixiApp.stage.on('pointerup', onDragEnd);
            pixiApp.stage.on('pointerupoutside', onDragEnd);

            function onDragMove(event: FederatedPointerEvent) {
                if (dragTarget) {
                    dragTarget.parent?.toLocal(event.global, undefined, dragTarget.position);
                }
            }

            function onDragStart(this: Sprite) {
                if(divRef.current === null || pixiApp === null) return;
                this.alpha = 0.5;
                dragTarget = this;
                pixiApp.stage.on('pointermove', onDragMove);
            }

            function onDragEnd() {
                if(divRef.current === null || pixiApp === null) return;
                if (dragTarget) {
                    pixiApp.stage.off('pointermove', onDragMove);
                    dragTarget.alpha = 1;
                    dragTarget = null;
                }
            }
        })();

        return () => {
            const pixiApp = usePixiApp();
            if (pixiApp) {
                pixiApp.destroy(true, { children: true });
                if (pixiApp.canvas.parentNode) {
                    pixiApp.canvas.parentNode.removeChild(pixiApp.canvas);
                }
            }
        };
    }, []);

    return <div ref={divRef} className="w-full h-full" />;
};

export default PixiTesti;
