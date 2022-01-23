require('dotenv').config();
const express = require('express');

const app = express();
const http = require('http').createServer(app);
const cors = require('cors');

const PORT = process.env.PORT || 3000;

const io = require('socket.io')(http, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'], 
    } });

    app.use(cors());

require('./sockets/chat')(io);

http.listen(PORT, () => {
  console.log(`Servidor ouvindo na porta ${PORT}`);
}); 