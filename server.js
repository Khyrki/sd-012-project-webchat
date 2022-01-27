const express = require('express');

const app = express();
const cors = require('cors');
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST'],
  } });
const chatController = require('./src/controllers/chat');

const { PORT = 3000 } = process.env;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
  
app.use(express.static('./public'));

app.set('view engine', 'ejs');
app.set('views', './views');

require('./src/sockets/chat')(io);

app.get('/', chatController.showChat);

http.listen(PORT, () => {
  console.log(`Servidor ouvindo na porta ${PORT}`);
});