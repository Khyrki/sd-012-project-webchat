const express = require('express');

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const webchat = require('./controllers/webchat');

app.get('/', webchat);

require('./sockets/webchat')(io);

http.listen(3000, () => {
  console.log('Server listening to port 3000');
});