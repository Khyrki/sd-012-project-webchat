const express = require('express');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3000;

const server = require('http').createServer(app);

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.use(express.static(`${__dirname}/views`));

require('./sockets')(io);

app.get('/', (_req, res) => res.sendFile(`${__dirname}/views/index.html`));

server.listen(PORT, () => console.log(`Servidor ouvindo na porta ${PORT}`));
