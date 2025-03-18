import React from 'react';
import * as ContextMenu from '@radix-ui/react-context-menu';
import { ChevronRightIcon } from '@heroicons/react/20/solid';

interface ActionEffectMenuProps {
    children?: React.ReactNode;
}

const ActionEffectMenu: React.FC = (props: ActionEffectMenuProps) => {
    return (
                <ContextMenu.Portal>
                    <ContextMenu.Content className='select-none rounded-md shadow-intense py-4 text-black bg-white flex flex-col gap-1 min-w-[200px]'>
                            <ContextMenu.Sub>
                                <ContextMenu.SubTrigger className='group relative flex h-[25px] justify-between select-none items-center pl-[25px] pr-[5px] leading-none text-black outline-none data-[disabled]:pointer-events-none data-[state=open]:bg-yellow-100 data-[disabled]:text-slate-400 data-[state=open]:text-red-400'>
                                    <div>Actions</div>
                                    <ChevronRightIcon className='w-5 h-5'/>
                                </ContextMenu.SubTrigger>
                                
                                <ContextMenu.SubContent className='select-none py-2 min-w-[200px] bg-white text-black rounded-md shadow-intense flex flex-col gap-1'>
                                    <ContextMenu.Item>
                                        <div className='p-1 py-2 hover:bg-yellow-500 mx-4'>Sub Action 1</div>
                                    </ContextMenu.Item>
                                    <ContextMenu.Item>
                                        <div className='p-1 hover:bg-yellow-500 mx-4'>Sub Action 2</div>
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