const app = require('express')();
const http = require('http').createServer(app); // conexão entre servidor e cliente
const moment = require('moment');
const cors = require('cors');
const io = require('socket.io')(http, {
  cors: { origin: 'http://localhost:3000', method: ['GET', 'POST'] } });
const { addMessage, getMessages } = require('./src/models/chat');
const rootRouter = require('./src/routes');

const PORT = 3000;
const connectedUsers = {};

io.on('connection', async (socket) => {
  Object.assign(connectedUsers, { [socket.id]: socket.id });
  io.to(socket.id).emit('userConnected', socket.id);
  io.emit('connectedUsers', connectedUsers);

  const history = await getMessages();
  io.to(socket.id).emit('messagesHistory', history);

  socket.on('changedNickname', ({ userId, newNick }) => {
    connectedUsers[userId] = newNick;
    io.emit('changedNickname', connectedUsers);
  });

  socket.on('disconnect', () => {
    delete connectedUsers[socket.id];
    io.emit('userLeft', connectedUsers);
  });

  socket.on('message', ({ chatMessage, nickname }) => {
    const timestamp = moment().format('DD-MM-YYYY HH:mm:ss');
    addMessage(timestamp, chatMessage, nickname);
    io.emit('message', `${timestamp} - ${nickname}: ${chatMessage}`);
  });
});

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/src/view`); // aqui informamos onde as views serão procuradas

app.use(cors());
app.use('/', rootRouter);

http.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
