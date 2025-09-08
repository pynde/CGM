import { Application, Container, Transform } from "pixi.js";
import React, { FC, PropsWithChildren, useEffect } from "react";
import { createTransformer } from "./PixiVanilla";

type PixiTransformerProps = {
    app: Application;
    children: React.ReactNode;
};

const PixiTransformer: FC<PixiTransformerProps> = ({ children, app }) => {

    useEffect(() => {
        if(children instanceof Container) {
            const groupContainer = new Container();
            React.Children.forEach(children.children, child => {
                if (child instanceof Container) {
                    groupContainer.addChild(child);
                }
            });
            const transformer = createTransformer(groupContainer);
            app.stage.addChild(transformer);
        }
        
    }, []);

    return <>{children}</>;
};

export default PixiTransformer;