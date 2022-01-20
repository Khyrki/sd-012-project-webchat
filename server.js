// Faça seu código aqui
const express = require('express');
const path = require('path');

const app = express();

const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.use(express.static(path.join(__dirname, 'public')));

const { getMsg } = require('./models/message');
require('./socket')(io);

app.set('view-engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', async (_req, res) => {
  const messages = await getMsg();
  return res.render('./index.ejs', { messages });
});
 
http.listen(3000, () => {
  console.log('Server listening on port 3000');
});