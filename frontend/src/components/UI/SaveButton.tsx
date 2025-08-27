import React from 'react';

type SaveButtonProps = {
    onClick: () => void;
    disabled?: boolean;
    children?: React.ReactNode;
};

const SaveButton: React.FC<SaveButtonProps> = ({ onClick, disabled = false, children }) => (
    <button type="button" onClick={onClick} disabled={disabled} className='interactivebutton'>
        {children ?? 'Save'}
    </button>
);

export default SaveButton;