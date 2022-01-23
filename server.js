const express = require('express');
const path = require('path');

const app = express();
const httpServer = require('http').createServer(app);

const PORT = process.env.PORT || 3000;

const io = require('socket.io')(httpServer, {
  cors: {
    origin: `https://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
});

require('./sockets/webchat')(io);
const controllers = require('./controllers');

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/views', express.static(path.join(__dirname, 'views')));

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', controllers.getAllMessages);

httpServer.listen(PORT, () => console.log(`Socket.io server is listening on PORT ${PORT}`));