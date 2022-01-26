const express = require('express');

const app = express();
app.use(express.json());

const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

require('./socket')(io);

const router = require('./routes');

app.set('view engine', 'ejs');
app.use(router);

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});