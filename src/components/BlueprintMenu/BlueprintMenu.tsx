import React, { ReactElement, useEffect } from 'react';
import * as ContextMenu from '@radix-ui/react-context-menu';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import {  GameViewType, useAddToView } from '@root/src/zustand/GameViewStore';
import { BlueprintType} from '@shared/types/types';

interface BlueprintMenuProps {
    gameComponents?: BlueprintType['gameComponents'];
    actions?: BlueprintType['actions'];
    effects?: BlueprintType['effects'];
    resources?: BlueprintType['resources'];
    onGameComponentsClick?: (...args: any[]) => void;
    onEffectsClick?: (...args: any[]) => void;
    onResourcesClick?: (...args: any[]) => void;
    children?: ReactElement<ContextMenu.ContextMenuItemProps>;
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
 * @param {BlueprintMenuProps} props - The props for the BlueprintMenu component.
 * @returns {JSX.Element} The rendered context menu for action effects.
 */


const BlueprintMenu: React.FC<BlueprintMenuProps> = (props: BlueprintMenuProps) => {

    return (
                <ContextMenu.Portal>
                    <ContextMenu.Content className='select-none rounded-md shadow-intense py-4 text-black bg-white flex flex-col gap-1 min-w-[200px]'>
                            { props.gameComponents && 
                                    <ContextMenu.Sub key={'game-components'}>
                                            <ContextMenu.SubTrigger className='group relative flex h-[25px] justify-between select-none items-center pl-[25px] pr-[5px] leading-none text-black outline-none data-disabled:pointer-events-none data-[state=open]:bg-yellow-100 data-disabled:text-slate-400 data-[state=open]:text-red-400'>
                                                <div>Game Components</div>
                                            <ChevronRightIcon className='w-5 h-5'/>
                                            </ContextMenu.SubTrigger>
                                        {props.gameComponents.map(([, item], index) => 
                                        <>
                                            <ContextMenu.SubContent key={`sub-${index}`} className='select-none py-2 min-w-[200px] bg-white text-black rounded-md shadow-intense flex flex-col gap-1'>
                                                <ContextMenu.Item key={`item-${index}`} onClick={() => props.onGameComponentsClick && props.onGameComponentsClick(item)}>
                                                    <div key={`name-${index}`} className='p-1 py-2 hover:bg-yellow-500 mx-4'>{item.name}</div>
                                                </ContextMenu.Item>
                                            </ContextMenu.SubContent>
                                        </>
                                        )}
                                </ContextMenu.Sub>
                            }
                            { props.effects && 
                                    <ContextMenu.Sub key={'effects-sub'}>
                                            <ContextMenu.SubTrigger className='group relative flex h-[25px] justify-between select-none items-center pl-[25px] pr-[5px] leading-none text-black outline-none data-disabled:pointer-events-none data-[state=open]:bg-yellow-100 data-disabled:text-slate-400 data-[state=open]:text-red-400'>
                                                <div>Effects</div>
                                            <ChevronRightIcon className='w-5 h-5'/>
                                            </ContextMenu.SubTrigger>
                                            <ContextMenu.SubContent className='select-none py-2 min-w-[200px] bg-white text-black rounded-md shadow-intense flex flex-col gap-1'>
                                        {props.effects.map(([,item]) => 
                                                <ContextMenu.Item onClick={() => props.onEffectsClick && props.onEffectsClick(item)}>
                                                    <div className='p-1 py-2 hover:bg-yellow-500 mx-4'>{item.name}</div>
                                                </ContextMenu.Item>
                                        )}
                                        </ContextMenu.SubContent>
                                        </ContextMenu.Sub>
                            }
                            { props.resources && 
                                    <ContextMenu.Sub key={'resources-sub'}>
                                            <ContextMenu.SubTrigger className='group relative flex h-[25px] justify-between select-none items-center pl-[25px] pr-[5px] leading-none text-black outline-none data-disabled:pointer-events-none data-[state=open]:bg-yellow-100 data-disabled:text-slate-400 data-[state=open]:text-red-400'>
                                                <div>Resources</div>
                                            <ChevronRightIcon className='w-5 h-5'/>
                                            </ContextMenu.SubTrigger>
                                        {props.resources.map(([,item]) => 
                                        <>
                                            <ContextMenu.SubContent className='select-none py-2 min-w-[200px] bg-white text-black rounded-md shadow-intense flex flex-col gap-1'>
                                                <ContextMenu.Item onClick={() => props.onResourcesClick && props.onResourcesClick(item)}>
                                                    <div className='p-1 py-2 hover:bg-yellow-500 mx-4'>{item.name}</div>
                                                </ContextMenu.Item>
                                            </ContextMenu.SubContent>
                                        </>
                                        )}
                                </ContextMenu.Sub>
                            }
                            <ContextMenu.Separator className='m-[10px] h-px bg-darkbg'/>
                            { props.children }
                    </ContextMenu.Content>
                </ContextMenu.Portal>
    );
};

export default BlueprintMenu;