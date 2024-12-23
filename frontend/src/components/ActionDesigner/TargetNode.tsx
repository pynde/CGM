import React, { useState } from 'react';
import * as Select from '@radix-ui/react-select';
import { ActionType, isTypeOf, Owner } from '@shared/types/types';
import { OWNER_TYPE_ENUM, TARGET_ENUM } from '@shared/enums/enums';

type TargetNodeProps = {
    onTargetChange: (target: TARGET_ENUM) => void;
};

const TargetNode: React.FC<TargetNodeProps> = ({ onTargetChange }) => {
    const [selectedTarget, setSelectedTarget] = useState<string>('');

    const handleTargetChange = (value: TARGET_ENUM) => {
        onTargetChange(value as TARGET_ENUM);
    };

    const targetOptions = Object.values(TARGET_ENUM).map(target => ({
        label: target,
        value: target,
    }));

    return (
        <div className='TargetNode'>
            <label htmlFor="target-select">Select Target:</label>
            <Select.Root onValueChange={handleTargetChange}>
                <Select.Trigger id="target-select">
                    <Select.Value placeholder="Select a target..." />
                </Select.Trigger>
                <Select.Content>
                    <Select.ScrollUpButton />
                    <Select.Viewport>
                        {targetOptions.map((target, index) => (
                            <Select.Item key={target.value} value={target.value}>
                                <Select.ItemText>{target.value}</Select.ItemText>
                            </Select.Item>
                        ))}
                    </Select.Viewport>
                    <Select.ScrollDownButton />
                </Select.Content>
            </Select.Root>
                        <Select.Root onValueChange={handleTargetChange}>
                <Select.Trigger id="target-select">
                    <Select.Value placeholder="Select a target..." />
                </Select.Trigger>
                <Select.Content>
                    <Select.ScrollUpButton />
                    <Select.Viewport>
                        {targetOptions.map((target, index) => (
                            <Select.Item key={target.value} value={target.value}>
                                <Select.ItemText>{target.value}</Select.ItemText>
                            </Select.Item>
                        ))}
                    </Select.Viewport>
                    <Select.ScrollDownButton />
                </Select.Content>
            </Select.Root>
            { (selectedTarget && Object.values(OWNER_TYPE_ENUM).some(value => value === selectedTarget)) && 
                    <Select.Root onValueChange={handleTargetChange}>
                    <Select.Trigger id="target-select">
                        <Select.Value placeholder="Select a target..." />
                    </Select.Trigger>
                    <Select.Content>
                        <Select.ScrollUpButton />
                        <Select.Viewport>
                            {targetOptions.map((target, index) => (
                                <Select.Item key={target.value} value={target.value}>
                                    <Select.ItemText>{target.value}</Select.ItemText>
                                </Select.Item>
                            ))}
                        </Select.Viewport>
                        <Select.ScrollDownButton />
                    </Select.Content>
                </Select.Root>
            }
        </div>
    );
};

export default TargetNode;