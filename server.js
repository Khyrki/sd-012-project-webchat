// Faça seu código aqui
const express = require('express');

const app = express();
const server = require('http').createServer(app);

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET'],
};

const io = require('socket.io')(server, { cors: corsOptions });

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static(`${__dirname}/views`));

app.get('/', require('./controller/client'));
require('./sockets/client')(io);

server.listen(3000, () => console.log('Server listening on port 3000'));
