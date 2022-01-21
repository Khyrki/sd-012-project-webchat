const express = require('express');

const app = express();
const server = require('http').createServer(app);
require('dotenv').config();
const cors = require('cors');
const moment = require('moment');

app.set('view engine', 'ejs');
app.set('views', './views');

const PORT = process.env.PORT || 3000;

const io = require('socket.io')(server, {
  cros: {
    origin: `http//localhost:${PORT}`,

    mthods: ['GET', 'POST'],
  },
});

const { getAllMsg } = require('./controller/messages');

const { create } = require('./models/message/messagesModel');

io.on('connection', (socket) => {
  console.log(`Feita a conexão! Novo usuario conectado. ${socket.id}`);
  io.emit('nickname', socket.id.substring(0, 16));

  socket.on('nickname', (name) => { // escuta jonas 
    io.emit('serverNickname', { nickname: name }); // envia jonas para front
  });

  socket.on('message', async ({ nickname, chatMessage }) => {
    // mensagem que vem do front o msg
    const timestamp = moment().format('DD-MM-yyyy HH:mm:ss A');
    await create(chatMessage, nickname, timestamp);
    io.emit('message', `${timestamp} - ${nickname}: ${chatMessage}`); // ele envia a msg para o front
  });
  
  socket.on('disconnect', () => {
    console.log('Usuário desconectou!');
  });
});

app.use(cors());

app.get('/', getAllMsg);

server.listen(PORT, () => console.log(`Ouvindo Socket.io server na porta ${PORT}!`));
