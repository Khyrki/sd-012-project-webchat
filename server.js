const express = require('express'); 

const app = express();
const PORT = 3000;
const http = require('http').createServer(app);
const moment = require('moment'); // https://momentjs.com/

const bodyParser = require('body-parser');

const io = require('socket.io')(http, { // https://socket.io/docs/
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`)); 

const date = moment().format('DD-MM-yyyy HH:mm:ss A');

io.on('connection', (socket) => {
  socket.on('message', (messagem) => {
    io.emit('message', `${date} - ${messagem.nickname}: ${messagem.chatMessage}`);
  });
});

http.listen(PORT, () => console.log(`Iniciando na porta ${PORT}!`));