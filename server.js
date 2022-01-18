const express = require('express');
// const bodyParser = require('body-parser');

const app = express();
const http = require('http').createServer(app);

const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.set('views', './views');

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    method: ['GET', 'POST'],
  },
});

const formatMessage = (chatMessage, nickname) => {
  const date = new Date();
  let DD = date.getDate();
  let MM = date.getMonth() + 1;
  const YYYY = date.getFullYear();
  const HH = date.getHours();
  const mm = date.getMinutes();
  const ss = date.getSeconds();

  if (DD.toString().length < 2) {
    DD = `0${DD}`;
  }

  if (MM.toString().length < 2) {
    MM = `0${MM}`;
  }

  const strMessage = `${DD}-${MM}-${YYYY} ${HH}:${mm}:${ss} - ${nickname}: ${chatMessage}`;

  return strMessage;
};

io.on('connection', (socket) => {
  console.log(`Usuário conectado. ID: ${socket.id}`);

  socket.on('message', ({ chatMessage, nickname }) => {
    io.emit('serverMessage', formatMessage(chatMessage, nickname));
  });
});

app.get('/', (req, res) => {
  res.status(200).render('chat/index', {});
});

http.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
