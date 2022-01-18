// Faça seu código aqui
const cors = require('cors');
const express = require('express');

const app = express();
const server = require('http').Server(app);

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
};
app.use(cors());

const io = require('socket.io')(server, { cors: corsOptions });

app.use(express.static(`${__dirname}/views`));
app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', require('./controller/client'));
require('./sockets/client')(io);

server.listen(3000, () => console.log('Server listening on port 3000'));
