import React, { useCallback, useEffect, useState } from 'react';
import { ActionType } from '@shared/types/types';
import clsx from 'clsx';


type ActionNodeProps = ActionType & React.HTMLAttributes<HTMLDivElement> & {
    active?: boolean,
    animateIn?: boolean,
    animateOut?: boolean,
    index: number,
    onDeleteActionFromPipe: (index: number) => void, 
}

export const ActionNode: React.FC<ActionNodeProps> = ({ 
    style = { width: 200, height: 60, maxHeight: 120, maxWidth: 300 },
    onDeleteActionFromPipe, 
    index,
    active,
    animateIn,
    animateOut,
    children,
    ...props
}) => {

    const [selectedNode, setSelectedNode] = useState<boolean>(false);
    const handleClick = () => {
        setSelectedNode(!selectedNode);
    };

    const styleWithVariable = () => {
        return {
            ...style,
            '--fullWidth': `${style.width}px`,
        }
    }

    return (
        <div 
            style={styleWithVariable()}
            className={
                clsx(
                    active && 'z-10 text-yellow-500 scale-110 m-2',
                    !active && 'm-0',
                    animateIn && 'animate-wide-out-jump-out',
                    animateOut && 'animate-wide-out jump-out',
                    `transition-[transform,margin,opacity] scale-100 animate-fill-forwards action-node flex flex-row dark:bg-darkbglighter text-center flex-center relative`
                )
            }
            {...props}
        >   
            <span onClick={handleClick} className='min-w-[var(--fullWidth)] overflow-hidden'>{props.name}</span>
            {/* If there's a target, show it */}
            {props.target && (
                <span className="action-target">
                    {'Target: ' + props.target.id}
                </span>
            )}
            <button onClick={() => onDeleteActionFromPipe(index)} className='m-2 p-2 absolute top-0 right-0 bg-red-400'>X</button>
            { children }
        </div>
    );
};

export default ActionNode;