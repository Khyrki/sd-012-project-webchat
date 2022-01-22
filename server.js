const express = require('express');
const { createServer } = require('http');
const path = require('path');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const app = express();
const httpServer = createServer(app);

const io = require('socket.io')(httpServer, {
  cors: {
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST'],
  }, 
});

app.use(express.static(path.join(`${__dirname}/public`)));

require('./sockets/chat')(io);

io.on('connection', (socket) => {
  console.log(`Usuário conectado. ID: ${socket.id} `);
});

httpServer.listen(PORT, () => console.log(`Servidor ouvindo na porta ${PORT}`));