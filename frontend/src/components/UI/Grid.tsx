import React from 'react';
import { BaseType } from '@shared/types/types';

type GridProps = React.HTMLAttributes<HTMLDivElement> & {
    items: BaseType[];
    onSelectItem: (item: BaseType) => void;
};

const Grid: React.FC<GridProps> = ({ items, onSelectItem }) => {
    
    const select = (item: BaseType) => {
        onSelectItem(item);
    }

    return (
        <div className="grid grid-cols-5 min-w-[100px]">
            {items.map(item => (
                <div key={item.id} className="p-2 outline outline-1 outline-white text-center">
                    <div className="text-md" onClick={() => select(item)}>{item.name}</div>
                </div>
            ))}
        </div>
    );
};

export default Grid;