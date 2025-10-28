import { createFileRoute } from '@tanstack/react-router'
import Main from '@/components/Main/Main';
import Navigation from '@/components/Navigation/Navigation';

const App : React.FC = () => { 

  return (
      <div className='dark:bg-darkbg dark:text-darktext h-full overflow-auto'>
        <Navigation/>
        <Main/>        
      </div>
  );
};

export default App;

export const Route = createFileRoute('/')({ component: App })