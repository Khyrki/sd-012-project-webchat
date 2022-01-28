const express = require('express');

const moment = require('moment');

const app = express();
const http = require('http').createServer(app);

app.use(express.json());

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'], 
  } });

const PORT = 3000;

http.listen(PORT, () => console.log(`Servidor ouvindo na porta ${PORT}`)); 