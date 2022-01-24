require('dotenv').config();

const { PORT } = process.env;
const app = require('express')();
const http = require('http').createServer(app);
const moment = require('moment');
const cors = require('cors');
const io = require('socket.io')(http, {
  cors: { origin: 'http://localhost:3000', method: ['GET', 'POST'] } });
const { addMessage } = require('./src/models/chat');

io.on('connection', async (socket) => {
  // Everytime a user connects, send his id.
  io.to(socket.id).emit('userConnected', socket.id);

  // Refresh user online list everytime a user connects
  const allSockets = await io.allSockets();
  io.emit('userJoined', [...allSockets]);

  // Refresh user online list everytime a user change its name
  socket.on('changedNickname', ({ oldNick, newNick }) => {
    io.emit('changedNickname', { oldNick, newNick });
  });

  // Refresh user online list everytime a user disconnects
  socket.on('disconnect', async () => {
    const sockets = await io.allSockets();

    io.emit('userLeft', [...sockets]);
    socket.disconnect();
  });

  socket.on('message', ({ chatMessage, nickname }) => {
    const timestamp = moment().format('DD-MM-YYYY HH:mm:ss');
    addMessage(timestamp, chatMessage, nickname);
    io.sockets.emit('message', `${timestamp} - ${nickname}: ${chatMessage}`);
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
