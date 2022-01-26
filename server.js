// Faça seu código aqui
const express = require('express');

const app = express();

const http = require('http').createServer(app);

const io = require('socket.io')(http, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});

io.on('connection', (socket) => {
    console.log(`Usuário conectado. ID: ${socket.id} `);
});

app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

http.listen(3000, () => {
  console.log('server ouvindo na porta 3000');
});
