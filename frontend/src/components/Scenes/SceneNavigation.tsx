import React, { FC, ReactNode, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import  * as Tabs from '@radix-ui/react-tabs'
import CardScene from './CardScene';
import Overview from './Overview';
import ComponentBuilder from './ComponentBuilder';
import { GameStateProvider } from '@root/src/context/GameStateContext';
import { ActionType, BlueprintType, GameComponentType, isTypeOf } from '@shared/types/types';
import { socket } from '@root/src/App';
import { ACTION_TYPE_ENUM, SOCKET_RESPONSE } from '@shared/enums/enums';
import ActionScene from './ActionScene';
import GameView from '../UI/GameView/GameView';
import { useSetBlueprint, useShallowBlueprint } from '@root/src/zustand/BlueprintStore';
import Warning from '../UI/Warning';
import { useSelection, setSelectionStore } from '@root/src/zustand/SelectionStore';

type TabContent = {
	tabName: string,
	tabContent: ReactNode
}

interface SceneNavigationProps {

}

const updateBp = (partialBp: Partial<BlueprintType>) => {
	useSetBlueprint(partialBp);
}

const SceneNavigation : FC<SceneNavigationProps> = (props: SceneNavigationProps) => {
	const INITIAL_TAB = 'ComponentBuilder';	
	const tabContent = 'tabContent';
	const contentRef = useRef<HTMLDivElement>(null);
	const [selectedTab, setSelectedTab] = useState(INITIAL_TAB);
	const [selectedAction, setSelectedAction] = useState<ActionType>();
	const [contentSize, setContentSize] = useState<{ width: number, height: number }>({ width: 400, height: 400 });
	const selected = useSelection();
	const bpStore = useShallowBlueprint();



	const sceneList: TabContent[] = [
		{tabName: 'Overview', tabContent: <GameStateProvider><Overview key={tabContent+0}/></GameStateProvider>}, 
		{tabName: 'Cards', tabContent: <CardScene key={tabContent+1}/>}, 
		{tabName: 'GameBoard', tabContent: <div key={tabContent+2}>Game Board placeholder</div>},
		{tabName: 'ComponentBuilder', tabContent: <ComponentBuilder key={tabContent+3}/> },
		{tabName: 'Actions', tabContent: <ActionScene key={tabContent+4}/>},
		{tabName: 'GameView', tabContent: <GameView key={tabContent+5} blueprint={bpStore}/>},
	];

	useEffect(() => {
		if(bpStore) {
			socket.emit('getBlueprint', (bp, status) => {
				if(status == SOCKET_RESPONSE.OK) {
					updateBp(bp);
					setSelectionStore(bp.gameComponents[0]?.[1]);
				} 
			});
		}
	  }, []);


	  useLayoutEffect(() => {
		const width_ = contentRef.current?.offsetWidth || 0;
		const height_ = contentRef.current?.offsetHeight || 0;
		const newSize = { width: width_, height: height_ };
		console.log('width_', width_, 'height_', height_);
		setContentSize(newSize);
	  }, [])

	const handleTabChange = (tabName: string) => {
	  setSelectedTab(tabName);
	};

	return (
	<Tabs.Root 
		className={'h-full flex flex-col grow'} 
		defaultValue={sceneList[5].tabName} 
		onValueChange={handleTabChange} 
		value={selectedTab}
	>
	  <Tabs.List className="flex space-x-1 shrink-0">
		{sceneList.map((scene, index) => (
		<Tabs.Trigger key={'tab' + index} value={scene.tabName} className={
		  `p-2.5 text-sm font-medium transition-all duration-100 bg-darkbglighter data-[state=active]:bg-actioncolor`}>
		  { scene.tabName }
		</Tabs.Trigger>
		))}
	  </Tabs.List>
		{sceneList.map((scene, index) => (
			<Tabs.Content 
				key={'tabContent' + index} 
				value={scene.tabName} 
				className="shadow-inner h-full w-full"
				ref={contentRef}
			>
				{scene.tabContent}
				<Warning open={false}/>
			</Tabs.Content>
		))}
	</Tabs.Root>
	);
};

export default SceneNavigation;