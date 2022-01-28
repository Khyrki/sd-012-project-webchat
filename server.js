const express = require('express');
const moment = require('moment');

const PORT = process.env.PORT || 3000;
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'], 
  }, 
});

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('views'));

const OnlineUsers = {};

io.on('connection', async (socket) => {
  OnlineUsers[socket.id] = socket.id.slice(0, 16);

  socket.on('disconnect', () => {
      delete OnlineUsers[socket.id]; io.emit('names', Object.values(OnlineUsers));
  });

  socket.on('message', async ({ chatMessage, nickname }) => {
      const time = moment().format('DD-MM-yyyy HH:mm:ss');
      io.emit('message', `${time} ${nickname}: ${chatMessage}`);
  });

  socket.on('newUser', (nickname) => {
      OnlineUsers[socket.id] = nickname; io.emit('names', Object.values(OnlineUsers));
  });

  io.emit('names', Object.values(OnlineUsers));
});

app.get('/', (req, res) => { res.render('index'); });
http.listen(PORT, () => { console.log(`Server on na porta: ${PORT}`); }); 