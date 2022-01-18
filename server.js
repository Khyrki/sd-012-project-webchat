// Faça seu código aqui
const cors = require('cors');
const express = require('express');

const app = express();
const server = require('http').Server(app);

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

const io = require('socket.io')(server, { cors: corsOptions });

require('./sockets/client')(io);

app.use(cors());
