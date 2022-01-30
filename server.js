// Faça seu código aqui
const express = require('express');
const path = require('path');
const CORS = require('cors');

const app = express();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer);

require('./sockets')(io);

app.use(CORS());
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);

app.set('view engine', 'html');

app.use('/', (req, res) => {
  res.render('index.ejs');
});

httpServer.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});
