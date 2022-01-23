const path = require('path');
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');

const chatHandler = require('./sockets/chat');

const { PORT = 3000 } = process.env;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
});

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (_req, res) => res.render('index'));

const onConnection = (socket) => {
  chatHandler(io, socket);
};

io.on('connection', onConnection);

httpServer.listen(PORT, () => { console.log(`Listening on port: ${PORT}`); });
