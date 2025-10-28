import React, { useState } from 'react';
import { ActionType } from '@shared/types/types';
import { ACTION_TYPE_ENUM } from '@shared/enums/enums';
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'

type CreateActionProps = {
    createAction: (action: ActionType) => void;
    defaultOpen?: boolean;
};

const CreateAction: React.FC<CreateActionProps> = ({ createAction, defaultOpen = true }) => {
    const [actionName, setActionName] = useState<string>('');
    const [actionType, setActionType] = useState<ACTION_TYPE_ENUM | ''>('');
    const [automatic, setAutomatic] = useState<boolean>(false);
    const [ownerId, setOwnerId] = useState<string>('');
    const [payload, setPayload] = useState<unknown>(null);
    const [open, setOpen] = useState<boolean>(defaultOpen);

    const handleSubmit = () => {
        if (actionType && ownerId) {
            const newAction: ActionType = {
                name: actionName,
                type: actionType,
                automatic,
                id: `${ownerId}-${Date.now()}`,
                ownerId,
                payload,
            };
            createAction(newAction);
        }
    };

    return (
        <>
        <Dialog open={false} onClose={() => setOpen(false)} className="relative inset-0 flex items-center justify-center p-4">
            <DialogPanel className="fixed bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <DialogTitle className="text-lg font-medium text-gray-900 mb-4">Create New Action</DialogTitle>
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Action Name:</label>
                        <input 
                            type="text" 
                            value={actionName} 
                            onChange={(e) => setActionName(e.target.value)} 
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Payload:</label>
                        <textarea 
                            value={payload as string} 
                            onChange={(e) => setPayload(e.target.value)} 
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>
                    <Button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">Create Action</Button>
                </form>
            </DialogPanel>
        </Dialog>
        </>
    );
};

export default CreateAction;