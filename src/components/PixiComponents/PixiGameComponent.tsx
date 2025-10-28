import React, { useEffect, useRef } from "react";
import { Application, ContainerChild, Graphics, Transform } from "pixi.js";
import { ContainerChildWithID, createPixiGameComponent, destroyPixiGameComponent } from "./PixiVanilla";
import { GameComponentType } from "@shared/types/types";

type PixiGameComponentProps = {
    interactive?: boolean;
    app: Application
} & GameComponentType;

const PixiGameComponent: React.FC<PixiGameComponentProps> = ({app, ...props}: PixiGameComponentProps) => {
    const pixiGameComponentRef = useRef<ContainerChildWithID | null>(null);

    useEffect(() => {
        const pixiGC = createPixiGameComponent(props);
        pixiGameComponentRef.current = pixiGC;
        pixiGC.container.eventMode = 'static';
        pixiGC.container.on("pointerdown", (e) => {
            console.log("Component clicked:", props.id, e);
            e.stopPropagation();
        });
        (async () => {
            if (pixiGC.container) {
                const gc = app.stage.addChild(pixiGC.container);
                app.stage.addChild()
            } 
        })();
        return () => {
            if (pixiGC.container && app) {
                app.stage.removeChild(pixiGC.container);
                destroyPixiGameComponent(pixiGC.container);
            }
        }
    }, [props.id]);

    return null;
};

export default PixiGameComponent;