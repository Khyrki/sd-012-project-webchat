const express = require('express');

const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  } });

const PORT = process.env.PORT || 3000;

app.use(express.static(`${__dirname}/src/views/chat`));

app.set('view engine', 'ejs');

app.set('views', './views');

require('./src/sockets/chat')(io);
// require('./src/sockets/rooms')(io);

app.get('/', (req, res) => {
  res.render(`${__dirname}/src/views/chat`);
});

http.listen(PORT, () => {
  console.log(`Servidor ouvindo na porta ${PORT}`);
});