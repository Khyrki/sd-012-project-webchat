// const net = require('net');

// const server = net.createServer((connection) => {
//   console.log('Cliente conectado');
//   connection.on('end', () => {
//     console.log('Cliente desconectado');
//   });
//   connection.write('Mensagem do servidor!\r\n');
//   connection.pipe(connection);
// });

// server.listen(8080, () => {
//   console.log('Servidor escutando na porta 8080');
// });

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

require('./sockets/chat')(io);

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/chat.html`);
});

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});
