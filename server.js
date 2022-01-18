const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const path = require('path');
require('dotenv').config();

const { PORT } = process.env;

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
});

require('./sockets/chat')(io);

io.on('connection', (socket) => {
  console.log(`${socket.id} se conectou`);
});

httpServer.listen(PORT);

app.use(express.static(path.join(`${__dirname}/public`)));

app.get('/', (_req, res) => res.sendFile(path.join(`${__dirname}/public/chat.html`)));
