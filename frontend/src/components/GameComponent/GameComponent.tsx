import React from 'react';
import { GameComponentType } from '@shared/types/types';


const GameComponent: React.FC<GameComponentType> = (props: GameComponentType) => {

    props
    return (
        <div className="gamecomponent" style={{ width: props.style.width, height: props.style.height, background: props.style.background }}>
            {props.style.imgUrls && props.style.imgUrls.map((url, index) => (
                <img key={index} src={url} alt={`Component ${props.id}`} style={{ maxWidth: props.style.maxWidth, maxHeight: props.style.maxHeight }} />
            ))}
            <div className="props-details">
                <h3>{props.type}</h3>
                <p>ID: {props.id}</p>
                <p>Owner ID: {props.ownerId}</p>
                {props.price && props.price.map((resource, index) => (
                    <div key={index}>
                        <p>Resource Type: {resource.type}</p>
                        <p>Amount: {resource.amount}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GameComponent;