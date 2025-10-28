import React from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';

interface WarningProps {
    children?: React.ReactNode;
    onConfirm?: () => void;
    onCancel?: () => void;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

const Warning: React.FC<WarningProps> = ({
    children,
    onConfirm,
    onCancel,
    open,
    onOpenChange,
}) => (
    <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
        <AlertDialog.Portal>
            <AlertDialog.Overlay className="fixed inset-0 bg-black/30" />
            <AlertDialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-50 border border-yellow-400 p-6 rounded shadow-lg max-w-md w-full">
                <AlertDialog.Title className="mb-4 font-bold text-yellow-800">
                    Warning
                </AlertDialog.Title>
                <AlertDialog.Description className="mb-4">
                    {children ? children : 'You have unfinished business. Are you sure you want to proceed?'}
                </AlertDialog.Description>
                <div className="flex justify-end gap-2">
                    <AlertDialog.Action asChild>
                        <button
                            onClick={onConfirm}
                            className="bg-red-600 text-white border-none px-4 py-2 rounded"
                        >
                            Confirm
                        </button>
                    </AlertDialog.Action>
                    <AlertDialog.Cancel asChild>
                        <button
                            onClick={onCancel}
                            className="bg-gray-300 text-black border-none px-4 py-2 rounded"
                        >
                            Cancel
                        </button>
                    </AlertDialog.Cancel>
                </div>
            </AlertDialog.Content>
        </AlertDialog.Portal>
    </AlertDialog.Root>
);

export default Warning;