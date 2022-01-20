const express = require('express');

const app = express();
const http = require('http').createServer(app);
const { Server } = require('socket.io');

app.use(express.static(`${__dirname}/view/chat`));

const { PORT = 3000 } = process.env;

const io = new Server(http, { 
  cors: {
     origin: 'http://localhost:3000',
     methods: ['GET'], 
  },
});

require('./socket/chat')(io);

app.get('/', (req, res) => {
  res.render(`${__dirname}/view/chat/index.ejs`);
});

app.set('view engine', 'ejs');

app.set('views', './view');

http.listen(PORT, () => console.log(`Listening on port ${PORT}`));
