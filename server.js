const express = require('express');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const http = require('http').createServer(app);
const getMsgs = require('./controllers/chatController');

const PORT = process.env.PORT || 3000;

const io = socketIo(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', getMsgs);

app.use(express.static(`${__dirname}/public`));

require('./sockets/chat')(io);

app.use(cors());

http.listen(PORT, () => console.log(`Escutando na porta ${PORT}`));
