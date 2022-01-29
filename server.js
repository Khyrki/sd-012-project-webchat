// Faça seu código aqui
const express = require('express');
const http = require('http');
const path = require('path');
const cors = require('cors');
const socketIO = require('socket.io');

const app = express();
app.use(express.json());
app.use(cors());

const httpServ = http.createServer(app);

const io = socketIO(httpServ, {
  cors: {
    origin: 'http://localhost:3000',
    method: ['GET', 'POST'],
  },
});
require('./src/chat')(io);

app.use(express.static(path.join(__dirname, './public')));

const port = process.env.PORT || 3000;

httpServ.listen(port, () => console.log(`app running on port ${port}`)); 