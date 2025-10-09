import express, { Request, Response } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { BlueprintType, OwnerArray,  } from '@shared/types/types'
import { GAME_STATE_ENUM, LOCALHOST_PORT, SOCKET_RESPONSE,} from '@shared/enums/enums'
import { ClientToServerEvents, ServerToClientEvents, SocketData } from '@shared/interfaces/socketEvents';
import { players, owners, blueprint } from './testdata';
// Initialize Express app and HTTP server
const app = express();
const server = http.createServer(app);


// Set up Socket.IO server
const io = new Server<ClientToServerEvents, ServerToClientEvents, SocketData>(server, {
  cors: {
    origin: "http://localhost:8080", // Adjust this based on frontend origin
    methods: ["GET", "POST"],
    credentials: true
  }
});



// Socket.IO connection event
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);
  // let gameState : GameState = {
  //   players: players,
  //   owners: owners,
  //   selectedComponents: [],
  //   actions: [],
  //   activePlayer: players[0].id,
  //   type: GAME_STATE_ENUM.GAME_STATE_TYPE,
  //   errors: []
  // }

  socket.on('updateBlueprint', (newBlueprint: Partial<BlueprintType>, callback: (response: SOCKET_RESPONSE) => void) => {
    Object.assign(blueprint, newBlueprint);
    socket.broadcast.emit('blueprint', blueprint);
    callback(SOCKET_RESPONSE.OK);
  });

  // socket.on('getGameState', (callback: (gameState: GameState, status: string) => void) => { 
  //   console.log('getGameState from socket', gameState)
  //   callback(gameState, SOCKET_RESPONSE.OK);
  // });

  socket.on('getBlueprint', (callback: (blueprint: BlueprintType, status: string) => void) => { 
    console.log('blueprint fetched')
    callback(blueprint, SOCKET_RESPONSE.OK);
  });

  // socket.on('getOwners', (callback: <T>(ownerArray: OwnerArray, status: string) => void) => { 
  //   console.log('getOwners from socket', gameState['owners'])
  //   callback(gameState['owners'], SOCKET_RESPONSE.OK);
  // })

  // // Listen for game state updates
  // socket.on('updateGameState', (newState, callback) => {
  //   console.log('GameState updated: ', newState)
  //   gameState = { ...gameState, ...newState };
  //   socket.emit('gameState', gameState); // Broadcast updated game state to all clients
  //   callback(SOCKET_RESPONSE.OK);
  // });

  // // Listen for game state updates
  // socket.on('updateOwners', (newState, callback) => {
  //   console.log('Owners updated: ', newState)
  //   gameState.owners = newState;
  //   socket.broadcast.emit('owners', newState); // Broadcast updated owners to all clients
  //   callback(SOCKET_RESPONSE.OK);
  // });
  
  // socket.on('setSelectedComponents', (selected, callback) => {
  //   const newSelection = Array.from(selected);
  //   console.log('socket', selected)
  //   gameState = { ...gameState, selectedComponents: newSelection };
  //   socket.emit('selectedComponents', newSelection);
  //   callback(SOCKET_RESPONSE.OK);
  // });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});


// Basic endpoint to confirm server is running
app.get('/', (req: Request, res: Response) => {
  res.send('Socket.IO Server Running');
});

// Start the server
server.listen(LOCALHOST_PORT.BACKEND, () => {
  console.log(`Server is running on http://localhost:${LOCALHOST_PORT.BACKEND}`);
});