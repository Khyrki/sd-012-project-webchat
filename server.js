const express = require('express');
const path = require('path');

const PORT = 3000;
const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`, 
    methods: ['GET', 'POST'],
  },
});

const controller = require('./controllers/chat');

require('./sockets/chat')(io);

app.set('view engine', 'ejs');

app.set('views', 'views');

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', controller.createChat);

app.post('/chat', controller.saveMessage);

http.listen(PORT, () => {
  console.log(`Servidor ouvindo na porta ${PORT}`);
});