const express = require('express');
// const messageModel = require('./models/messageModel');

const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.use(express.static(`${__dirname}/views`));
// app.set('view engine', 'ejs');

require('./sockets/users')(io);
require('./sockets/messages')(io);

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});
