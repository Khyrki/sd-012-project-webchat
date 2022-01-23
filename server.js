require('dotenv').config();
const app = require('express')();
const http = require('http').createServer(app);
const cors = require('cors');

const io = require('socket.io')(http, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'], 
    } });

    app.use(cors());

require('./sockets/chat')(io);

const { PORT } = process.env || 3000;

http.listen(3000, () => {
  console.log(`Servidor ouvindo na porta ${PORT}`);
}); 