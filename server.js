require('dotenv').config();

/* Criação do server com express e http */
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const httpServer = require('http').createServer(app);

/* Definição da porta */
const PORT = process.env.PORT || 3000;

/* Definições para uso do ejs */
app.set('view engine', 'ejs');

app.set('views', './views');

/* Acesso aos arquivos na pasta public */
app.use(express.static(path.join(__dirname, 'public')));

/* Definição do socket.io com a função io */
const io = require('socket.io')(httpServer, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST', 'PUT'],
  },
});

require('./sockets/chat')(io);

app.use(cors());
app.use(express.json());

const { allMessages } = require('./controllers/chatController');

app.get('/', allMessages);

httpServer.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});
