const express = require('express');

const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.json());

const PORT = 3000;

const socketIoServer = require('http').createServer(app);
const io = require('socket.io')(socketIoServer, {
  cors: { // Aqui existe um objeto de configuração, essas options são necessárias a partir da major 3 do socket.io 
    origin: `http://localhost:${PORT}`, // origem permitida
    methods: ['GET', 'POST'], // métodos permitidos
  },
});

io.on('connection', (socket) => {
  console.log(`Uma nova conexão com ${socket.id} foi estabelecida!`);
});

app.get('/', (_req, res) => {
  res.render('index');
});

socketIoServer.listen(
  PORT, console.log(`Socket.io Server listening on port ${PORT}!`),
);