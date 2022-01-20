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

io.on('connection', (socket) => {
  console.log(`Feita a conexão! Novo usuario conectado. ${socket.id}`);

  socket.on('nickname', (name) => { // escuta jonas 
    io.emit('serverNickname', { nickname: name }); // envia jonas para front
  });

  socket.on('message', ({ nickname, chatMessage }) => {
    // mensagem que vem do front o msg
    const timestamp = moment().format('DD-MM-yyyy HH:mm:ss A');
    
    io.emit('message', `${timestamp} - ${nickname}: ${chatMessage}`); // ele envia a msg para o front
  }); 
});

app.use(cors());

app.get('/', (req, res) => {
  res.render('client');
});

server.listen(PORT, () => console.log(`Ouvindo Socket.io server na porta ${PORT}!`));
