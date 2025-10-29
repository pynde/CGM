import React, { useCallback, useContext, useEffect, useState } from 'react';
import { ActionType, Owner } from '@shared/types/types';
import { Toggle } from '@radix-ui/react-toggle';
import { CheckIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import TargetNode from './TargetNode';


type ActionNodeProps = ActionType & React.HTMLAttributes<HTMLDivElement> & {
    active?: boolean,
    animateIn?: boolean,
    animateOut?: boolean,
    index: number,
    onDeleteActionFromPipe: (index: number) => void, 
}

export const ActionNode: React.FC<ActionNodeProps> = ({ 
    style = { width: 200, minHeight: 100 },
    onDeleteActionFromPipe, 
    index,
    active,
    animateIn,
    animateOut,
    children,
    ...props
}) => {

    const styleWithVariable = () => {
        return {
            ...style,
            '--minWidth': `${style.width}px`,
            '--minHeight': `${style.minHeight}px`,
        }
    }

    const selectTarget = () => {

    }

    return (
        <div 
            style={styleWithVariable()}
            className={
                clsx(
                    active && 'z-10 text-yellow-500 scale-110 m-2',
                    !active && 'm-0',
                    animateIn && 'animate-jump-in',
                    animateOut && 'animate-wide-out jump-out',
                    `min-h-(--minHeight) h-fit max-h-[600px] transition-[transform,margin,opacity] scale-100 animate-fill-forwards action-node flex flex-col dark:bg-darkbglighter text-center flex-center relative`
                )
            }
        >   
            <span onClick={e => (e)} className='min-w-(--minWidth) overflow-hidden p-2'>{props.name}</span>
            <div className='flex-center-row'>
                <span className='m-2'>You <i>may...</i></span>
                <Toggle aria-label="Toggle italic" className='group p-1 bg-darkbg rounded-sm h-4 w-4'>
                    <CheckIcon className='group-data-[state=off]:hidden group-data-[state=on]:inherit '/>
                </Toggle>
            </div>
            {/* If there's a target, show it */}
            {props.target && 
                <TargetNode onTargetChange={() => {  }} />
            }
 
            <button onClick={() => onDeleteActionFromPipe(index)} className='m-2 p-2 absolute top-0 right-0 bg-red-400'>X</button>
            { children }
        </div>
    );
};

export default ActionNode;