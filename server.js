const express = require('express');
const cors = require('cors');
const http = require('http');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const app = express();
const httpServer = http.createServer(app);
app.use(cors());

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static(`${__dirname}/views`));

const io = require('socket.io')(httpServer, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
});

require('./sockets/chat')(io);

const chatController = require('./controllers/chat');

app.get('/', chatController);

httpServer.listen(PORT, () => {
  console.log(`Server conectado na porta ${PORT}`);
});