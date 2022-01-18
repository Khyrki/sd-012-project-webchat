require('dotenv').config();
const app = require('express')();
const http = require('http').createServer(app);
const moment = require('moment');
const cors = require('cors');
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

const { PORT } = process.env;

app.use(cors());
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/view`);

app.get('/', (_req, res) => {
  res.render(`${__dirname}/src/view/index`, { teste: 'hehe' });
});

http.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
