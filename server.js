const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');

const { PORT = 3000 } = process.env;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
});

const onConnection = (_socket) => { };

io.on('connection', onConnection);

httpServer.listen(PORT, () => { console.log(`Listening on port: ${PORT}`); });
