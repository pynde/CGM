
import { BaseType } from '@shared/types/types';
import React, { useEffect } from 'react';
import * as Popover from '@radix-ui/react-popover';

import { useState } from 'react';
import Action from '../Actions/Action';
import Grid from './Grid';

interface LookupDialogProps {
    buttonText: string;
    dialogContent: [string, BaseType][];
    onSelectItem: (item: BaseType) => void;
}

const LookupDialog: React.FC<LookupDialogProps> = ({ buttonText, dialogContent, onSelectItem }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState<BaseType | null>(null);

    useEffect(() => {
        console.log('Dialog Content', dialogContent);
    },[]);

    return (
        <div className='flex items-center justify-center w-full'>
        <Popover.Root>
            <Popover.Trigger>
                {buttonText}
            </Popover.Trigger>
            <Popover.Content>
                <Grid onSelectItem={item => onSelectItem(item)} items={dialogContent.map(([,item]) => item)}></Grid>
            </Popover.Content>
        </Popover.Root>
        </div>
    );
};

export default LookupDialog;