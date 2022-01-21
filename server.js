const express = require('express');

const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000', // url aceita pelo cors
    methods: ['GET', 'POST'], // Métodos aceitos pela url
  } });
  const stringGenerator = require('./helpers/stringGenerator');
  
  app.use(express.static(`${__dirname}/public`));
  require('./sockets/chat')(io);
  
app.set('view engine', 'ejs');
app.set('views', './public/views');

app.get('/', (req, res) => {
  res.render('chat', { nickname: stringGenerator(16) });
});

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});
