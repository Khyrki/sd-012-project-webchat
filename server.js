require('dotenv').config();

/* Criação do server com express e http */
const express = require('express');
const path = require('path');

const app = express();
const httpServer = require('http').createServer(app);

/* Definição da porta */
const PORT = process.env.PORT || 3000;

/* Definição do socket.io com a função io */
const io = require('socket.io')(httpServer, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST', 'PUT'],
  },
});

/* Definições para uso do ejs */
app.set('view engine', 'ejs');

/* Acesso aos arquivos na pasta public */
app.use(express.static(path.join(__dirname, 'public')));

require('./sockets/chat')(io);

const { allMessages } = require('./controllers/chatController');

app.get('/', allMessages);

httpServer.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});
