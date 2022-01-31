const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', () => {
  console.log('Alguém entrou');
});

app.get('/', (_req, res) => {
  res.sendFile(path.resolve(__dirname, './public/index.html'));
});

httpServer.listen(process.env.PORT, () => console.log(`Conectado na porta ${process.env.PORT}`));
