import React from 'react';

type DeleteActionProps = {
    actionId: string;
    onDelete: (actionId: string) => void;
};

const DeleteAction: React.FC<DeleteActionProps> = ({ actionId, onDelete }) => {
    const handleDelete = () => {
        onDelete(actionId);
    };

    return (
        <button onClick={handleDelete} className="bg-red-500 text-white p-2 rounded">
            Delete Action
        </button>
    );
};

export default DeleteAction;