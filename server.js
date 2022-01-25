const express = require('express');

const app = express();
const http = require('http').createServer(app);
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { PORT } = process.env;

app.use(cors());

app.use('/public', express.static(path.join(__dirname, 'public')));

const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
});

require('./socket')(io);
require('./socketConnections')(io);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

http.listen(PORT || 3000, () => {
  console.log(`Servidor conectado na porta ${PORT}`);
});