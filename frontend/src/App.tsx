import React from 'react';
import Main from './components/Main/Main';
import Navigation from './components/Navigation/Navigation';
import { ClientToServerEvents, ServerToClientEvents } from '@shared/interfaces/socketEvents';
import { LOCALHOST_PORT } from '@shared/enums/enums';
import { io, Socket } from 'socket.io-client';
import "@pixi/layout";



export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(`http://localhost:${LOCALHOST_PORT.BACKEND}`)

const App : React.FC = () => { 

  return (
      <div className='dark:bg-darkbg dark:text-darktext h-full overflow-auto'>
        <Navigation/>
        <Main/>        
      </div>
  );
};

export default App;