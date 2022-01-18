const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const EXPRESS_PORT = 3000;
const SOCKETIO_PORT = 5000;

const socketIoServer = require('http').createServer();
const io = require('socket.io')(socketIoServer, {
  cors: {
    origin: `http://localhost:${EXPRESS_PORT}`,
    methods: ['GET', 'POST'], 
  },
});

io.on('connection', (socket) => {
  console.log(`Uma nova conexão com ${socket.id} foi estabelecida!`);

  // socket.emit('evento', []);
});

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(
  EXPRESS_PORT, 
  () => console.log(`Express App listening on port ${EXPRESS_PORT}!`),
);

socketIoServer.listen(
  SOCKETIO_PORT, console.log(`Socket.io Server listening on port ${SOCKETIO_PORT}!`),
);