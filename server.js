require('dotenv').config();
const app = require('express')();
const cors = require('cors');
const http = require('http').createServer(app); // conexão entre servidor e cliente
const moment = require('moment');

const io = require('socket.io')(http, { // servidor ao qual iremos nos comunicar e verbos de acesso
  cors: {
    origin: 'http://localhost:3000/',
    method: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  socket.on('message', ({ chatMessage, nickname }) => {
    const timestamp = moment().format('DD-MM-YYYY HH:mm');
    io.emit('message', `${timestamp} - ${nickname}: ${chatMessage}`);
  });
});

const { PORT = 3000 } = process.env;

app.use(cors());
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/view`); // aqui informamos onde as views serão procuradas

app.get('/', (_req, res) => {
  res.render(`${__dirname}/src/views/index`, { teste: 'hehe' });
});

http.listen(PORT, () => console.log(`App runnign on port: ${PORT}`));