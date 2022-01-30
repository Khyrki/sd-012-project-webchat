const express = require('express');

const app = express();
const http = require('http').createServer(app);
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
});
const root = require('./controller/root');

require('./sockets/chat')(io);

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static(`${__dirname}/views`));

app.use('/', root);

http.listen(PORT, () => console.log(`Ouvindo na porta: ${PORT}`));
