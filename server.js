const express = require('express');

const app = express();

const http = require('http').createServer(app);

const PORT = 3000;

const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
});

require('./sockets/webChat')(io);

app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public`);
});

http.listen(PORT, () => {
  console.log(`Servidor ouvindo na porta ${PORT}`);
});
