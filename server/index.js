const http = require('http');
const express = require('express');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ['https://draw-frontend.onrender.com'],
  },
});

io.on('connection', (socket) => {
  // user joins a room
  socket.on('join-room', (boardId) => {
    socket.join(boardId);
  });

  // client is ready to get current board state
  socket.on('client-ready', (boardId) => {
    socket.to(boardId).emit('get-canvas-state');
  });

  // send state to new joined user
  socket.on('canvas-state', ({ boardId, state }) => {
    socket.to(boardId).emit('canvas-state-from-server', state);
  });

  // draw to every board
  socket.on('draw-line', ({ boardId, prevPoint, currentPoint, color }) => {
    socket.to(boardId).emit('draw-line', { prevPoint, currentPoint, color });
  });

  // clear the board
  socket.on('clear', (boardId) => io.to(boardId).emit('clear'));
});

server.listen(process.env.PORT || 5000, () => {
  console.log('Server listening on port: 5000');
});
