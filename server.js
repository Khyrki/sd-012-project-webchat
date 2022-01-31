// Faça seu código aqui
const app = require('express')();
const http = require('http').createServer(app);
const cors = require('cors');
const path = require('path');
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    method: ['GET', 'POST'],
  },
});
const {
  adjustNicknameSize,
  defineData,
} = require('./funçõesDeApoio/funcoes');

app.use(cors());

io.on('connection', (socket) => {
  console.log('Alguém se conectou');

  socket.on('disconnect', () => {
    console.log('Alguém saiu');
  });

  socket.on('message', (msg) => {
    const newNickname = adjustNicknameSize(msg);
    io.emit('message', (`${defineData()} ${newNickname} ${msg.chatMessage}`));
    // console.log(`Alguém enviou a mensagem: ${msg}`);
  });

  socket.emit('mensagem', ('Bem vindo(a) ao Webchat'));

  // socket.broadcast.emit('serverMessage', { message: 'Tivemos uma nova conexão!' });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}/index.html`));
});

http.listen(3000, () => {
  console.log('Servidor auvindo na porta 3000');
});
