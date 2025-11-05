import { FC, ReactNode, useEffect } from 'react';
import SceneNavigation from '../Scenes/SceneNavigation';


interface MainProps {
  children?: ReactNode
}

const Main : FC<MainProps> = ({ children }) => {

  useEffect(() => {
  }, []);

  return (
    <div className='w-full h-full'>
        <div className='flex w-full h-full'>
          <SceneNavigation/>
        </div>
    </div>
    
  );
};

export default Main;