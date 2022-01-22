const express = require('express');

require('dotenv').config();

const messageController = require('./controllers/messagesController');

const app = express();
const http = require('http').createServer(app);

const PORT = process.env.PORT || 3000;
const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`, // url aceita pelo cors
    methods: ['GET', 'POST'], // Métodos aceitos pela url
  } });
  const stringGenerator = require('./helpers/stringGenerator');
  
  app.use(express.static(`${__dirname}/public`));
  require('./sockets/chat')(io);
  
app.set('view engine', 'ejs');
app.set('views', './public/views');

app.get('/', (req, res) => {
  return res.render('chat', { nickname: stringGenerator(16) });
});
app.get('/', messageController.getAllMessages);

http.listen(PORT, () => {
  console.log(`Servidor ouvindo na porta ${PORT}`);
});
