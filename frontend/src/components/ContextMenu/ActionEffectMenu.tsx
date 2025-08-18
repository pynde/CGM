import React, { useEffect } from 'react';
import * as ContextMenu from '@radix-ui/react-context-menu';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import {  GameViewType, useAddToView } from '@root/src/zustand/GameViewStore';
import { GAME_COMPONENT_ENUM } from '@shared/enums/enums';

interface ActionEffectMenuProps {
    children?: React.ReactNode;
}


/**
 * 
 * Based on ContextMenu.Portal from Radix UI
 * Renders a context menu for selecting action effects and game components.
 *
 * This menu provides submenus for "Game components" and "Effects", each containing selectable items.
 * It also includes a separator and an option to add a background.
 *
 * @component
 * @param {ActionEffectMenuProps} props - The props for the ActionEffectMenu component.
 * @returns {JSX.Element} The rendered context menu for action effects.
 */


const ActionEffectMenu: React.FC = (props: ActionEffectMenuProps) => {

    const dummyView: GameViewType = {
        id: 'dummyView',
        type: GAME_COMPONENT_ENUM.CARD,
        actions: [],
        price: [],
        ownerId: 'dummyOwner',
        name: 'Dummy View',
        style: {
            x: 0,
            y: 0,
            width: 400,
            height: 400,
            fill: 'lightgray'
        }
    }

    const addToView = useAddToView;

    return (
                <ContextMenu.Portal>
                    <ContextMenu.Content className='select-none rounded-md shadow-intense py-4 text-black bg-white flex flex-col gap-1 min-w-[200px]'>
                            <ContextMenu.Sub>
                                <ContextMenu.SubTrigger className='group relative flex h-[25px] justify-between select-none items-center pl-[25px] pr-[5px] leading-none text-black outline-none data-[disabled]:pointer-events-none data-[state=open]:bg-yellow-100 data-[disabled]:text-slate-400 data-[state=open]:text-red-400'>
                                    <div>Game components</div>
                                    <ChevronRightIcon className='w-5 h-5'/>
                                </ContextMenu.SubTrigger>
                                
                                <ContextMenu.SubContent className='select-none py-2 min-w-[200px] bg-white text-black rounded-md shadow-intense flex flex-col gap-1'>
                                    <ContextMenu.Item onClick={() => addToView(dummyView)}>
                                        <div className='p-1 py-2 hover:bg-yellow-500 mx-4'>Component 1</div>
                                    </ContextMenu.Item>
                                    <ContextMenu.Item>
                                        <div className='p-1 hover:bg-yellow-500 mx-4'>Component 2</div>
                                    </ContextMenu.Item>
                                </ContextMenu.SubContent>
                            </ContextMenu.Sub>
                            <ContextMenu.Sub>
                                <ContextMenu.SubTrigger className='group relative flex h-[25px] justify-between select-none items-center pl-[25px] pr-[5px] leading-none text-black outline-none data-[disabled]:pointer-events-none data-[state=open]:bg-yellow-100 data-[disabled]:text-slate-400 data-[state=open]:text-red-400'>
                                    <div>Effects</div>
                                    <ChevronRightIcon className='w-5 h-5'/>
                                </ContextMenu.SubTrigger>
                                <ContextMenu.Portal>
                                <ContextMenu.SubContent className='select-none py-4 min-w-[200px] bg-white text-black rounded-md shadow-intense flex flex-col gap-1'>
                                    <ContextMenu.Item>
                                        <div className='p-1 mx-4 grow'>Sub Effect 1</div>
                                    </ContextMenu.Item>
                                    <ContextMenu.Item>
                                        <div className='p-1 mx-4 grow'>Sub Effect 2</div>
                                    </ContextMenu.Item>
                                </ContextMenu.SubContent>
                                </ContextMenu.Portal>
                            </ContextMenu.Sub>
                            <ContextMenu.Separator className='m-[10px] h-px bg-darkbg'/>
                            <ContextMenu.Item className='pl-[25px] pr-[5px] data-[disabled]:pointer-events-none data-[disabled]:text-slate-400 data-[highlighted]:bg-yellow-500'>
                                Add a background...
                            </ContextMenu.Item>
                    </ContextMenu.Content>
                </ContextMenu.Portal>
    );
};

export default ActionEffectMenu;