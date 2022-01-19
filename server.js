const express = require('express');

const cors = require('cors');

const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  } });

app.set('view engine', 'ejs');

app.set('views', './views');

app.use(express.static(`${__dirname}/public`));

app.use(cors());

app.get('/', (_request, response) => {
  response.render('chat');
});

require('./sockets/chat')(io);

  const PORT = process.env.PORT || 3000;

  http.listen(PORT, () => console.log(`Listen on PORT ${PORT}`));
