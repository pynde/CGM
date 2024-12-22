import * as Accordion from "@radix-ui/react-accordion";
import React, { useCallback, useContext, useEffect } from "react";
import ItemDetails from "../UI/ItemDetails";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { LookupContext } from "@root/src/context/LookupContext";


/**
 * Props for the CollapsibleList component.
 * @interface CollapsibleListProps
 * @property {ReactNode | string} label - The label text/content shown in the disclosure button
 * @property {ReactNode} [children] - The content to be shown/hidden inside the disclosure panel
 */
interface CollapsibleListProps {
    label: string | React.ReactNode
    children?: React.ReactNode
}

/**
 * A collapsible list component that can show/hide its content.
 * 
 * @component
 * @param {Object} props - The component props
 * @param {ReactNode} props.label - The label text/content shown in the disclosure button
 * @param {ReactNode} props.children - The content to be shown/hidden inside the disclosure panel
 * 
 * @returns A disclosure component with a button that toggles visibility of children content
 */
const CollapsibleList: React.FC<CollapsibleListProps> = (props: CollapsibleListProps) => {    
    const { selected } = useContext(LookupContext);
    useEffect(() => { 

    }, [selected])

    return (
        <Accordion.Root type="single" collapsible>
            <Accordion.Item value="item-1">
            <Accordion.Header>
                <Accordion.Trigger className='my-2 group flex flex-row center items-center w-full h-8'>
                {props.label}
                <ChevronRightIcon className='w-6 group-data-[state=open]:rotate-90'/>
                </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className='pb-4 pt-2'>
                {props.children}
                <div className='w-full h-px bg-gray-500/50 mt-1' />
            </Accordion.Content>
            </Accordion.Item>
        </Accordion.Root>
    );
}
export default CollapsibleList;