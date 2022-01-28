const express = require('express');

const app = express();
const cors = require('cors');
const http = require('http').createServer(app);
const socketIo = require('socket.io');

const PORT = process.env.PORT || 3000;

const io = socketIo(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.use(express.static(`${__dirname}/public`));

require('./sockets/chat')(io);

app.use(cors());

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});
http.listen(PORT, () => console.log(`Escutando na porta ${PORT}`));
