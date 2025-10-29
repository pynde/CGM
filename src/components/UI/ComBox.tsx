
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';
import React, { useCallback, useState } from 'react';
import * as Select from '@radix-ui/react-select';

export interface ComBoxProps extends React.HTMLAttributes<HTMLDivElement> {
    options: string[];
    onNameSelect: (selectedString: string) => void;
    defaultValue?: string;
    placeholder?: string;
    triggerContent?: React.ReactNode;
    triggerClassName?: React.HTMLAttributes<HTMLButtonElement>['className'];
    iconClassName?: React.HTMLAttributes<HTMLSpanElement>['className'];
}

const ComBox: React.FC<ComBoxProps> = ({ defaultValue, options, onNameSelect, placeholder='Select', triggerContent, ...props }) => {
    const [selected, setSelected] = useState<string>(defaultValue || '');

    const handleRootChange = useCallback((str: string | null) => {
        if(str) {
            onNameSelect(str); 
            setSelected(str);
        }
    }, [onNameSelect]);


    return (
	<Select.Root value={selected} onValueChange={handleRootChange}>
		<Select.Trigger
            className={
                props.triggerClassName  ||
                'inline-flex w-60 h-[35px] items-center justify-center rounded-md bg-darkbglighter text-[13px] leading-none hover:bg-darkbg data-placeholder:text-yellow-500'
                }
			aria-label="Actions"
		>   
            { triggerContent ? triggerContent : 
            <>		
                <Select.Value placeholder={placeholder} defaultValue={defaultValue} />
                <Select.Icon className={props.iconClassName}>
                    <ChevronDownIcon className='w-4 h-4'/>
                </Select.Icon> 
            </>
            }
		</Select.Trigger>
		<Select.Portal>
			<Select.Content 
                position='popper' 
                collisionPadding={0} 
                align='center' 
                className="p-2 overflow-hidden rounded-md bg-white w-full"
            >
				<Select.ScrollUpButton className="flex-center h-[25px] cursor-default bg-white ">
					<ChevronUpIcon />
				</Select.ScrollUpButton>
				<Select.Viewport className='Viewport grid grid-cols-5 auto-rows-fr w-full h-full'>  
                    {options.map((option) => (
                        <Select.Item
                            key={option}
                            value={option}
                            className="relative flex items-center justify-start h-[25px] select-none border-none p-4 text-[13px] leading-none  data-[highlighted]:bg-g data-highlighted:text-yellow-500"
                        >
                            <Select.ItemText className='border-none border-0'>{option}</Select.ItemText>
                        </Select.Item>
                    ))}
				</Select.Viewport>
				<Select.ScrollDownButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-pink">
					<ChevronDownIcon />
				</Select.ScrollDownButton>
			</Select.Content>
		</Select.Portal>
	</Select.Root>
    );
};

export default ComBox;