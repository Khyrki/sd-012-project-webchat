const app = require('express')();
const http = require('http').createServer(app);
const moment = require('moment');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    method: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  // socket.broadcast.emit('message', `${socket.id} se conectou!`);

  socket.on('message', ({ chatMessage, nickname }) => {
    const timestamp = moment().format('DD-MM-YYYY HH:mm');
    io.emit('message', `${timestamp} - ${nickname}: ${chatMessage}`);
  });
});

app.use(cors());
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

app.get('/', (_req, res) => {
  res.render(`${__dirname}/src/views/index`, { teste: 'hello' });
});

http.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
