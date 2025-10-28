import React from 'react';


interface SceneProps {
    name: string;
    content: React.ReactNode;
}

export const Scene: React.FC<{ name: string; content: React.ReactNode }> = ({ name, content }) => {
    return (
        <div className="scene">
            <h2>{name}</h2>
            <div className="scene-content">
                {content}
            </div>
        </div>
    );
};