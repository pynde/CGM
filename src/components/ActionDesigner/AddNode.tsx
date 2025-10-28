import React, { ReactElement, ReactNode, useEffect, useMemo, useRef } from 'react';
import { ArrowDownCircleIcon, PlusCircleIcon } from '@heroicons/react/20/solid';
import { SelectIcon, SelectValue, Trigger } from '@radix-ui/react-select';
import RadixSelect, { RadixSelectProps } from '../UI/RadixSelect';
import { generateId } from '@shared/logic/generateId';
import useAnime from '@root/src/hooks/AnimeHooks';
import clsx from 'clsx';

type AddNodeProps = RadixSelectProps & {
    addSVGIcon?: ReactElement<React.SVGProps<SVGSVGElement>>
    iconSize?: number
}

const AddNode: React.FC<AddNodeProps> = ({ addSVGIcon, iconSize=8, ...props }) => {

        const iconWithClassNames = React.Children.map(props.children, (child) => {
            if(React.isValidElement<ReactElement<React.SVGProps<SVGSVGElement>>>(child)) {
               return React.cloneElement(child as ReactElement, { className: clsx(props.className,`transition-[height] duration-400 ease-out opacity-20 hover:opacity-100 group-data-[state=open]:h-0 group-data-[state=closed]:h-full`) }) 
            }
            return null;
        })

    return (
        <RadixSelect options={props.options} onNameSelect={props.onNameSelect}>
            <RadixSelect.CustomTrigger className={
                clsx(props.className, `group`)
                }
            >
                <SelectIcon className='w-8 h-8 z-10' >
                    { props.placeholder && <SelectValue placeholder={props.placeholder} className='text-white'></SelectValue> }
                    { addSVGIcon || <PlusCircleIcon className={`transition-[height] duration-400 ease-out opacity-20 hover:opacity-100 group-data-[state=open]:h-0 group-data-[state=closed]:h-full`}/> }
                    <ArrowDownCircleIcon className='text-yellow-500 drop-shadow-glow opacity-100 transition-[height] duration-400 ease-out group-data-[state=open]:h-full group-data-[state=open]:scale-110 group-data-[state=closed]:h-0'/>
                </SelectIcon>
            </RadixSelect.CustomTrigger>
        </RadixSelect>
    );
};

export default AddNode;