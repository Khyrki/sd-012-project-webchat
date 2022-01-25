// Faça seu código aqui
require('dotenv').config();
const express = require('express');

const app = express();
const httpServer = require('http').createServer(app);

const PORT = process.env.PORT || 3000;

const io = require('socket.io')(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.set('view engine', 'ejs');

app.use(express.static(`${__dirname}/public`));

require('./sockets/chat')(io);

httpServer.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});