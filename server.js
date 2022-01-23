require('dotenv').config();

const { PORT } = process.env;
const app = require('express')();
const http = require('http').createServer(app);
const moment = require('moment');
const cors = require('cors');
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    method: ['GET', 'POST'],
  },
});

io.on('connection', async (socket) => {
  const allSockets = await io.allSockets();

  io.sockets.emit('userJoined', [...allSockets]);

  socket.on('changedNickname', ({ oldNick, newNick }) => {
    console.log(socket.id);
  });

  socket.on('disconnect', async () => {
    const sockets = await io.allSockets();

    io.sockets.emit('userLeft', [...sockets]);
    socket.disconnect();
  });

  socket.on('message', ({ chatMessage, nickname }) => {
    const timestamp = moment().format('DD-MM-YYYY HH:mm');
    io.sockets.emit('message', `${timestamp} - ${nickname}: ${chatMessage}`);
  });
});

app.use(cors());
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/view`);

app.get('/', (_req, res) => {
  res.render(`${__dirname}/src/view/index`);
});

http.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
