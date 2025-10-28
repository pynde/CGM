import React from 'react';
import GroupIcon  from '@root/public/groupIcon.svg';

type AddGroupNodeProps = {
    onClick: () => void;
};

const AddGroupNode: React.FC<AddGroupNodeProps> = ({ onClick }) => (
    <button className='w-10 h-10 absolute -top-4' type="button" onClick={onClick}>
        <GroupIcon />
    </button>
);

export default AddGroupNode;