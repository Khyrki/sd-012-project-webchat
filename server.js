require('dotenv').config();
/* eslint-disable */
const { PORT } = process.env;
const app = require('express')();
const http = require('http').createServer(app);
const moment = require('moment');
const cors = require('cors');
const io = require('socket.io')(http, {
  cors: { origin: 'http://localhost:3000', method: ['GET', 'POST'] } });
const { addMessage, getMessages } = require('./src/models/chat');

const connectedUsers = {};

io.on('connection', async (socket) => {
  Object.assign(connectedUsers, { [socket.id]: socket.id });
  io.to(socket.id).emit('userConnected', socket.id);
  io.emit('connectedUsers', connectedUsers);

  const history = await getMessages();
  io.emit('messagesHistory', history);

  socket.on('changedNickname', ({ userId, newNick }) => {
    connectedUsers[userId] = newNick;
    io.emit('changedNickname', connectedUsers);
  });

  socket.on('disconnect', async () => {
    delete connectedUsers[socket.id];
    io.emit('userLeft', connectedUsers);
  });

  socket.on('message', ({ chatMessage, nickname }) => {
    const timestamp = moment().format('DD-MM-YYYY HH:mm:ss');
    addMessage(timestamp, chatMessage, nickname);
    io.emit('message', `${timestamp} - ${nickname}: ${chatMessage}`);
  });
});

app.use(cors());
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

app.get('/', (_req, res) => {
  res.render(`${__dirname}/src/views/index`);
});

http.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
