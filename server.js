const express = require('express');

const app = express();
const http = require('http').createServer(app);
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`usuario conectado, id: ${socket.id}`);
});

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (_req, res) => {
  res.sendFile(`${__dirname}html.ejs`);
});

http.listen(PORT, () => console.log(`Ouvindo na porta: ${PORT}`));
