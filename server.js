const express = require('express');
const cors = require('cors');
const http = require('http');

const PORT = proces.env.PORT || 3000;

const app = express();
const httpServer = http.createServer(app);
app.use(cors());

const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
});

httpServer.listen(PORT, () => {
  console.log(`Server conectado na porta${PORT}`);
});