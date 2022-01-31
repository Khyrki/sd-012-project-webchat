// Faça seu código aqui
const express = require('express');
const cors = require('cors');

const app = express();
const http = require('http').createServer(app);

app.set('view engine', 'ejs');
app.set('views', './views');

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.use(express.static(`${__dirname}/public`));

app.use(cors());

app.get('/', (_request, response) => {
  response.render('chat');
});

require('./socket/socket')(io);

const PORT = 3000;
http.listen(PORT, () => console.log(`Listen on PORT ${PORT}`));