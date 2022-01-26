const express = require('express');
const moment = require('moment');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: { origin: `http://localhost:${PORT}`, methods: ['GET', 'POST'] },
});
const { receiveFromDB, sendToDB } = require('./models/chat');

app.use(express.static('views'));
app.set('view engine', 'ejs');
app.set('views', './views');

const onlineUser = {};

io.on('connection', async (socket) => {
  onlineUser[socket.id] = socket.id.slice(0, 16);

  socket.on('disconnect', () => {
    delete onlineUser[socket.id]; io.emit('userList', Object.values(onlineUser)); 
  });

  socket.on('message', async ({ chatMessage, nickname }) => {
    const dataTime = moment().format('DD-MM-yyyy HH:mm:ss');
    io.emit('message', `${dataTime} ${nickname}: ${chatMessage}`);
    await sendToDB({ dataTime, nickname, chatMessage });
  });

  socket.on('newName', (nickname) => {
    onlineUser[socket.id] = nickname; io.emit('userList', Object.values(onlineUser));
  });

  const messagesHistory = async () => {
    const messages = await receiveFromDB(); return messages;
  };
  io.emit('messagesHistory', await messagesHistory());

  io.emit('userList', Object.values(onlineUser));
});

app.get('/', (req, res) => { res.render('index'); });

http.listen(3000, () => { console.log(`Server running on port ${PORT}`); });