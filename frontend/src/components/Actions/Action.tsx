import React, { useContext, useEffect } from 'react';
import { ActionType } from '@shared/types/types';
import { LookupContext } from '@root/src/context/LookupContext';

type ActionProps = ActionType & {
    index?: number,
    onDeleteActionFromPipe?: (index: number) => void, 
    onActionClick?: (action: ActionType) => void;
}

export const Action: React.FC<ActionProps> = ({ onActionClick, 
    style = { width: 200, height: 60, maxHeight: 120, maxWidth: 300 },
    onDeleteActionFromPipe, 
    index,
    ...props
}) => {

    const { selected, updateSelected } = useContext(LookupContext);


    const conditionalDeleteButton = () : JSX.Element | null => {
        if(onDeleteActionFromPipe && index) {
            return <button onClick={() => onDeleteActionFromPipe(index)} className='m-2 p-2 absolute top-0 right-0 bg-red-400'>X</button>
        }
        else return null;
    }

    return (
        <div 
        style={style}
            className="action-component dark:bg-darkbglighter text-center flex-center relative z-1"
        >
            {/* Display action type or custom content */}
            <div
            >{props.name}</div>
            
            {/* If there's a target, show it */}
            {props.target && (
                <span className="action-target">
                    → {props.target.id}
                </span>
            )}
            { conditionalDeleteButton() }
        </div>
    );
};

export default Action;