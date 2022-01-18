require('dotenv').config();
const app = require('express')();
const http = require('http').createServer(app);
const cors = require('cors');
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    method: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  const date = new Date();
  const { day, month, year, hour, minutes } = {
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
    hour: date.getHours(),
    minutes: date.getMinutes(),
  };

  const nickname = socket.id;

  socket.emit('entered', `Olá, ${socket.id}!`);
  socket.broadcast.emit('message', `${socket.id} se conectou!`);

  socket.on('message', (msg) => {
    io.emit('message', `${day}-${month}-${year} ${hour}:${minutes} - ${nickname}: ${msg}`);
  });
});

const { PORT } = process.env;

app.use(cors());
app.set('view engine', 'ejs');
app.set('views', 'src/view');

app.get('/', (_req, res) => {
  res.sendFile(`${__dirname}/src/view/index.html`);
});

http.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
