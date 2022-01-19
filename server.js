const express = require('express');
const http = require('http');
const path = require('path');
const cors = require('cors');
const socketIo = require('socket.io');

const app = express();

app.use(express.json());
app.use(cors());

const httpServer = http.createServer(app);

const io = socketIo(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    method: ['GET', 'POST'],
  },
});

app.use(express.static(path.join(__dirname, './public')));

require('./src/sockets/chat')(io);

app.get('/', (_req, res) => {
  res.sendFile(path.resolve(__dirname, './public/index.html'));
});

const port = process.env.PORT || 3000;

httpServer.listen(port, () => console.log(`app running on port ${port}`));
