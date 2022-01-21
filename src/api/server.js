require('dotenv').config();
const express = require('express');

const app = express();
const cors = require('cors');
const http = require('http').createServer(app);
// const path = require('path');

const PORT = process.env.PORT || 3000;

const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`, // url aceita pelo cors
    methods: ['GET', 'POST'], // Métodos aceitos pela url
  },
});

app.use(cors());
require('./sockets/chat')(io);

app.use(express.static(`${__dirname}/views`));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/views/chat.html`);
});

http.listen(PORT, () => {
  console.log(`httpServer is listening on port ${PORT}`);
});