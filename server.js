const express = require('express');

const app = express();
const http = require('http').createServer(app);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 3000;

const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`Usuário conectado: ${socket.id}`);
});

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static(`${__dirname}/public`));

http.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});