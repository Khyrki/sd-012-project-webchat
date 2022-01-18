const express = require('express');

const app = express();
const cors = require('cors');
const http = require('http').createServer(app);
const socketIo = require('socket.io');
const sockets = require('./sockets/chat');

const io = socketIo(http, {
    cors: {
        origin: 'http://localhost:3000',
        method: ['GET', 'POST'],
    },
});

sockets.first(io);
sockets.second(io);

app.use(cors());

app.get('/', (_req, res) => {
  res.sendFile(`${__dirname}/public/chat.html`);
});

const { PORT = 3000 } = process.env;

http.listen(PORT, () => console.log(`Listening on Port ${PORT}`));
