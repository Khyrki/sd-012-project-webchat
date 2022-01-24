require('dotenv').config();
const express = require('express');

const app = express();
const http = require('http');
const cors = require('cors');
const socketIo = require('socket.io');

const httpServer = http.createServer(app);

const chat = require('./sockets/chat');

const PORT = process.env.PORT || 3000;

const io = socketIo(httpServer, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'], 
    } });
    
chat(io);
    
app.use(cors());

httpServer.listen(PORT, () => {
  console.log(`Servidor ouvindo na porta ${PORT}`);
}); 