const express = require('express');

const app = express();

const httpServer = require('http').createServer(app);

const io = require('socket.io')(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});
// agradeço ao KEVIN por ter tirado algum tempo dele para  me instruir com alguns conhecimentos e mostrar as formas que ele usou em seu repositório 
// para interagir commo o ejs pelo socket , veja o código original em https://github.com/tryber/sd-012-project-webchat/pull/1
const controllerChat = require('./controller/chat');

app.set('view engine', 'ejs');

app.set('views', './views');

app.get('/', controllerChat);

require('./sockets/msgChat')(io);

httpServer.listen(3000, () => console.log('listening on port 3000'));