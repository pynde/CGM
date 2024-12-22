import React from 'react';

type AndOrButtonProps = {
    type: 'and' | 'or';
};

const AndOrButton: React.FC<AndOrButtonProps> = ({ type }) => {
    return (
        <button className="min-w-4 min-h-4 p-2 bg-darkbg text-white rounded">
            {type.toUpperCase()}
        </button>
    );
};

export default AndOrButton;