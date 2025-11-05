import  * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { Link, type LinkComponentProps } from '@tanstack/react-router';
import { FC, useLayoutEffect, useRef, useState } from 'react';
import ActionScene from './ActionScene';
import Overview from './Overview';

type TabContent = {
	tabName: string,
	tabContent: LinkComponentProps;
}

const SceneNavigation : FC = (props) => {
	const INITIAL_TAB = 'GameView';	
	const tabContent = 'tabContent';
	const contentRef = useRef<HTMLDivElement>(null);
	const [selectedTab, setSelectedTab] = useState(INITIAL_TAB);
	const [contentSize, setContentSize] = useState<{ width: number, height: number }>({ width: 400, height: 400 });

	const sceneList: TabContent[] = [
		{ tabName: 'Overview', tabContent: <Link to="/designer">Overview</Link> }, 
		{ tabName: 'ComponentDesigner', tabContent: <Link to="/designer/components">Component Designer</Link> },
		{ tabName: 'Actions', tabContent: <Link to="/designer/actions">Actions</Link> },
		// { tabName: 'GameView', tabContent: <Link to="/designer/game">Game View</Link> },
	];

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
	<NavigationMenu.Root className="h-full flex flex-col grow">
		<NavigationMenu.List className="flex space-x-1 shrink-0">
			{sceneList.map((scene) => (
				<NavigationMenu.Item key={`nav-${scene.tabName}`}>
					<NavigationMenu.Trigger
						className={`p-2.5 text-sm font-medium transition-all duration-100 bg-darkbglighter ${
							selectedTab === scene.tabName ? 'bg-actioncolor' : ''
						}`}
						onClick={() => handleTabChange(scene.tabName)}
					>
						{scene.tabName}
					</NavigationMenu.Trigger>
				</NavigationMenu.Item>
			))}
		</NavigationMenu.List>
	</NavigationMenu.Root>
	);
};

export default SceneNavigation;