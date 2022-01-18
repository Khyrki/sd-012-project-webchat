const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const path = require('path');
const socketIo = require('socket.io');
const chatController = require('./controllers');
const socketMessages = require('./sockets');

const app = express();
const httpServer = http.createServer(app);
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(`${__dirname}/public`)));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const io = socketIo(httpServer, {
  cors: {
      origin: `http://localhost:${PORT}`,
      method: ['GET', 'POST'],
  },
});

socketMessages(io);

// app.set('view engine', 'ejs');
// app.set('views', './views');

app.use('/', chatController);
app.get('/', (_req, res) => {
  res.sendFile(path.join(`${__dirname}/public`));
});

httpServer.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}`));