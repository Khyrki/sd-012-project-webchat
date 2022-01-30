// const express = require('express');

// const app = express();
// const http = require('http').createServer(app);

// const io = require('socket.io')(http, {
//   cors: {
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST'],
//   },
// });

// app.use(express.static(`${__dirname}/public`));

// require('./sockets/chat')(io);

// app.get('/', (req, res) => {
//   res.sendFile(`${__dirname}/public/chat.html`);
// });

// http.listen(3000, () => {
//   console.log('Servidor ouvindo na porta 3000');
// });

const express = require('express');

const EXPRESS_PORT = 3001;
const SOCKETIO_PORT = 3000;

const app = express();
const socketIoServer = require('http').createServer(app);

const io = require('socket.io')(socketIoServer, {
  cors: {
    origin: `http://localhost:${EXPRESS_PORT}`,
    methods: ['GET', 'POST'],
  },
});

app.use(express.static(`${__dirname}/public`));

require('./sockets/chat')(io);

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/chat.html`);
});

app.listen(
  EXPRESS_PORT, 
  () => console.log(`Express App listening on port ${EXPRESS_PORT}!`),
);

socketIoServer.listen(
  SOCKETIO_PORT, console.log(`Socket.io Server listening on port ${SOCKETIO_PORT}!`),
);