// server.js

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
app.use(cors());

const io = socketIo(server,{
  cors: {
    origin: '*',
  }
});

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle video call events
  socket.on('join-call', (roomId) => {
    socket.join(roomId);
    console.log(`User joined room ${roomId}`);
  });

  socket.on('userJoined', (stream) => {
    socket.broadcast.emit('userJoined', stream);
    console.log('User joined with stream:', stream);
  });

  socket.on('offer', (data) => {
    io.to(data.roomId).emit('offer', data.offer);
  });

  socket.on('answer', (data) => {
    io.to(data.roomId).emit('answer', data.answer);
  });

  socket.on('ice-candidate', (data) => {
    io.to(data.roomId).emit('ice-candidate', data.candidate);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
