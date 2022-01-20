const express = require('express');
const path = require('path');

const app = express();
const http = require('http').createServer(app);

require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/views', express.static(path.join(__dirname, 'src', 'views')));
app.use('/public', express.static(path.join(__dirname, 'src', 'public')));

const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  }, 
});
  
app.use(express.static(`${__dirname}/public`));

app.set('view engine', 'ejs');
app.set('views', './src/views');

require('./src/socket')(io);

const router = require('./src/routers');

app.use('/', router);

http.listen(PORT, () => console.log(`server rodando na porta ${PORT}`));
