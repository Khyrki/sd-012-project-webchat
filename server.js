const express = require('express');

const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const webchat = require('./controllers/webchatController');

app.use(express.static(__dirname));
app.set('view engine', 'ejs');
app.set('views', './views');

require('./sockets/chat')(io);

app.get('/', webchat);

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});