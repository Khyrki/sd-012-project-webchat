const express = require('express');
const socketIo = require('socket.io');
const path = require('path');
const cors = require('cors');
const http = require('http');

const app = express();

app.use(express.json());
app.use(cors());

const httpServer = http.createServer(app);

const io = socketIo(httpServer, {
  cors: {
    origin: 'https://localhost:3000',
    method: ['GET', 'POST'],
  },
});

app.use(express.static(path.join(__dirname, './public/')));

require('./sockets/message')(io);
require('./sockets/user')(io);

app.get('/', (_req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, './public/index.html'));
});

httpServer.listen(3000, () => console.log('Conectado na porta 3000'));