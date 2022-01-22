// Faça seu código aqui
const express = require('express');
require('dotenv').config();

const app = express();
const http = require('http').createServer(app);
const cors = require('cors');
const socketio = require('socket.io');
const webchatSocket = require('./src/sockets/webchat');
const userSocket = require('./src/sockets/user');

const { PORT } = process.env;

app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(cors());

const io = socketio(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

webchatSocket(io);
userSocket(io);

app.get('/', (_req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

http.listen(PORT || 3000, () => console.log(`Listening on port ${PORT || 3000}`));