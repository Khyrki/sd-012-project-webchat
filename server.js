// Faça seu código aqui
const express = require('express');

const app = express();
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 3000;

const httpServer = http.createServer(app);

const io = socketIo(httpServer, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`${socket.id} is connected!`);
});

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, './public/')));

require('./src/sockets/chat/chatMessage')(io);
require('./src/sockets/user/userConnection')(io);

app.get('/', (_req, res) => {
  res.status(200).sendFile(path.join(__dirname, './public/index.html'));
});

// servidor http
httpServer.listen(
  PORT,
  () => console.log(`SOCKET.IO running on port ${PORT}`),
);