const express = require('express');

const PORT = process.env.PORT || 3000;
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'], 
  }, 
});

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static(`${__dirname}, public`));

require('./sockets/chatSockets')(io);

app.get('/', (req, res) => {
  res.render('view');
});

http.listen(PORT, () => {
  console.log(`To ouvindo na porta ${PORT}`);
}); 