const app = require('express')();
const http = require('http').createServer(app);
const cors = require('cors');
require('dotenv').config();

const { PORT } = process.env;

app.use(cors());

const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
});

require('./socket')(io);

http.listen(PORT, () => {
  console.log(`Servidor conectado na porta ${PORT}`);
});