// Faça seu código aqui
require('dotenv').config();
const express = require('express');

const app = express();

const http = require('http').createServer(app);

const io = require('socket.io')(http, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});

require('./src/sockets/chat')(io);

app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/src/public/index.html`);
});

http.listen(3000, () => {
  console.log('server ouvindo na porta 3000');
});