// oi ja iniciei jura

const express = require('express');

const app = express();
const path = require('path');
const server = require('http').createServer(app);
require('dotenv').config();

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.use(express.static(path.join(__dirname, '/public')));

require('./pastuxa/chatSocket')(io);

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

server.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});