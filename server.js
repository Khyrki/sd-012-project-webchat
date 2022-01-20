require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const socketIoServer = require('http').createServer(app);

const PORT = 3000;

const io = require('socket.io')(socketIoServer, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
});

const controller = require('./controllers/chat');

require('./sockets/chat')(io);

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

app.get('/', controller);

socketIoServer.listen(
  PORT, console.log(`Socket.io Server listening on port ${PORT}!`),
);
