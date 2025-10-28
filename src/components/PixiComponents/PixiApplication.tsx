import React, { useEffect, useRef } from 'react';
import { Application } from 'pixi.js';

type PixiApplicationProps = {
    app: Application;
    ref?: React.RefObject<HTMLDivElement>;
    children?: React.ReactNode;
}

/** 
 * Create a root for PixiJS rendering within a React component.
 * This component initializes a PixiJS Application and appends its view (canvas)
 * to the DOM. It also handles cleanup on unmount.
 */
const PixiApplication: React.FC<PixiApplicationProps> = ({ app, children }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        (async () => {
            await app.init({ resizeTo: containerRef.current || window, backgroundColor: 'blue' })
            if (containerRef.current) {
                containerRef.current.appendChild(app.canvas);
            }
        })();

        // Cleanup on unmount
        return () => {
            app.destroy(true, { children: true });
            if (containerRef.current && app.canvas.parentNode === containerRef.current) {
                containerRef.current.removeChild(app.canvas);
            }
        };
    }, []);

    return <div ref={containerRef} style={{ width: '100%', height: '100%' }}>{children}</div>;
};

export default PixiApplication;