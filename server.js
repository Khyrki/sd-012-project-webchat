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

const EXPRESS_PORT = 3001;
const SOCKECTIO_PORT = 3000;

const app = express();
const socketIoServer = require('http').createServer(app);

const io = require('socket.io')(socketIoServer, {
  cors: {
    origin: `http://localhost:${EXPRESS_PORT}`,
    methods: ['GET', 'POST'],
  },
});

app.use(express.static(`${__dirname}/public`));

require('./sockets/chat')(io);

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/chat.html`);
});

app.listen(EXPRESS_PORT, () => console.log(`Express App linstening on port ${EXPRESS_PORT}`));

socketIoServer.listen(SOCKECTIO_PORT, () => {
  console.log(`Servidor Socket.IO ouvindo na porta ${SOCKECTIO_PORT}`);
});
