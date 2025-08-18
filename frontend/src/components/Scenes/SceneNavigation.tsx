import React, { FC, ReactNode, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import  * as Tabs from '@radix-ui/react-tabs'
import CardScene from './CardScene';
import Overview from './Overview';
import ComponentBuilder from './ComponentBuilder';
import { GameStateProvider } from '@root/src/context/GameStateContext';
import { ActionType, isTypeOf } from '@shared/types/types';
import { socket } from '@root/src/App';
import { ACTION_TYPE_ENUM, SOCKET_RESPONSE } from '@shared/enums/enums';
import { LookupContext } from '@root/src/context/LookupContext';
import { BlueprintContext } from '@root/src/context/BlueprintContext';
import ActionScene from './ActionScene';
import GridSelection from '../UI/GridSelection/GridSelection';
import GameView from '../UI/GameView/GameView';

type TabContent = {
	tabName: string,
	tabContent: ReactNode
}

interface SceneNavigationProps {

}



const SceneNavigation : FC<SceneNavigationProps> = (props: SceneNavigationProps) => {
	const INITIAL_TAB = 'ComponentBuilder';	
	const tabContent = 'tabContent';
	const contentRef = useRef<HTMLDivElement>(null);
	const [selectedTab, setSelectedTab] = useState(INITIAL_TAB);
	const [selectedAction, setSelectedAction] = useState<ActionType>();
	const [contentSize, setContentSize] = useState<{ width: number, height: number }>({ width: 400, height: 400 });
	const { selected, updateSelected } = useContext(LookupContext);
	const { blueprint, updateBlueprint } = useContext(BlueprintContext);
	

	const sceneList: TabContent[] = [
		{tabName: 'Overview', tabContent: <GameStateProvider><Overview key={tabContent+0}/></GameStateProvider>}, 
		{tabName: 'Cards', tabContent: <CardScene key={tabContent+1}/>}, 
		{tabName: 'GameBoard', tabContent: <div key={tabContent+2}>Game Board placeholder</div>},
		{tabName: 'ComponentBuilder', tabContent: <ComponentBuilder/> },
		{tabName: 'Actions', tabContent: <ActionScene key={tabContent+4}/>},
		{tabName: 'GameView', tabContent: <GameView blueprint={blueprint}/>},
	];


	const setAction = () => {
		if (!selected) return;
		if(isTypeOf<ActionType>(selected, ACTION_TYPE_ENUM)) {
			setSelectedAction(selected)
		}
	}


	useEffect(() => {
		if(blueprint) {
			socket.emit('getBlueprint', (bp, status) => {
				if(status == SOCKET_RESPONSE.OK) {
					updateBlueprint(bp);
				} 
			});
		}
		console.log('contentRef', contentRef.current);

	  }, []);

	  useLayoutEffect(() => {
		const width_ = contentRef.current?.offsetWidth || 0;
		const height_ = contentRef.current?.offsetHeight || 0;
		const newSize = { width: width_, height: height_ };
		console.log('width_', width_, 'height_', height_);
		setContentSize(newSize);
	  }, [])

	  
	  useEffect(() => {
		if(blueprint.gameComponents[0]) {
			updateSelected({ ...selected, selectedComponent: blueprint.gameComponents[0][1]});
		}
	  }, [blueprint])

	  useEffect(() => {
		setAction()
	  }, [selected]);


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
			</Tabs.Content>
		))}
	</Tabs.Root>
	);
};

export default SceneNavigation;