require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const socketIo = require('socket.io');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const http = require('http').createServer(app);

const PORT = process.env.PORT || 3000;

const io = socketIo(http, {
    cors: {
        origin: `http:\\localhost:${PORT}`,
        method: ['GET', 'POST'],
    },
});

require('./sockets/chat')(io);

app.set('view engine', 'ejs');
app.set('views', './public/views');

app.use(express.static(path.join(__dirname, '/public/views')));

app.get('/', (_req, res) => {
    res.sendFile(path.join(`${__dirname}/public/views/client.html`));
  });

http.listen(PORT, () => {
    console.log(`Ouvindo na porta ${PORT}`);    
});
