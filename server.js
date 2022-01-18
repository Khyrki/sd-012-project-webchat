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

  // socket.emit('entered', `Olá, ${socket.id}!`);
  socket.broadcast.emit('message', `${socket.id} se conectou!`);

  socket.on('message', (msg) => {
    io.emit('message', `${day}-${month}-${year} ${hour}:${minutes} - ${nickname}: ${msg}`);
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
