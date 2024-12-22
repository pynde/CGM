import React, { FC, ReactNode, useContext, useEffect, useState } from 'react';
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

type TabContent = {
	tabName: string,
	tabContent: ReactNode
}

interface SceneNavigationProps {

}

const SceneNavigation : FC<SceneNavigationProps> = (props: SceneNavigationProps) => {
	const INITIAL_TAB = 'Actions';
	const [selectedTab, setSelectedTab] = useState(INITIAL_TAB);
	const [selectedAction, setSelectedAction] = useState<ActionType>()
	const { selected, updateSelected } = useContext(LookupContext);
	const { blueprint, updateBlueprint } = useContext(BlueprintContext);


	const setAction = () => {
		if (!selected) return;
		if(isTypeOf<ActionType>(selected, ACTION_TYPE_ENUM)) {
			setSelectedAction(selected)
		}
	}

	const sceneList: TabContent[] = [
		{tabName: 'Overview', tabContent: <GameStateProvider><Overview key={'tabContent'+0}/></GameStateProvider>}, 
		{tabName: 'Cards', tabContent: <CardScene key={'tabContent'+1}/>}, 
		{tabName: 'Game board', tabContent: <div key={'tabContent'+2}>Game Board placeholder</div>},
		{tabName: 'Component builder', tabContent: <ComponentBuilder key={'tabContent'+3}/> },
		{tabName: 'Actions', tabContent: <ActionScene key={'tabContent'+4}/>},
	];

	useEffect(() => {
		if(blueprint) {
			socket.emit('getBlueprint', (bp, status) => {
				if(status == SOCKET_RESPONSE.OK) {
					updateBlueprint(bp);
				} 
			});
		}
	  }, []);

	  
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
		defaultValue={sceneList[4].tabName} 
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
			selectedTab === scene.tabName &&
			<Tabs.Content 
				key={'tabContent' + index} 
				value={scene.tabName} 
				className="rounded-lg shadow-inner h-full"
			>
				{scene.tabContent}
			</Tabs.Content>
		))}
	</Tabs.Root>
	);
};

export default SceneNavigation;