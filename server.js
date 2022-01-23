const express = require('express');

require('dotenv').config();

const app = express();
const http = require('http').createServer(app);

const PORT = process.env.PORT || 3000;
const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`, // url aceita pelo cors
    methods: ['GET', 'POST'], // Métodos aceitos pela url
  } });
  
const messageController = require('./controllers/messagesController');
const stringGenerator = require('./helpers/stringGenerator');

app.set('view engine', 'ejs');

app.set('views', './public/views');

app.get('/', messageController.getAllMessages);

app.use(express.static(`${__dirname}/public`));

require('./sockets/chat')(io);
  
app.get('/', (req, res) => res.render('../views/chat', { nickname: stringGenerator(16) }));

http.listen(PORT, () => {
  console.log(`Servidor ouvindo na porta ${PORT}`);
});
