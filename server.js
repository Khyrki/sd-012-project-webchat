require('dotenv').config();
const app = require('express')();
const cors = require('cors');
const http = require('http').createServer(app); // conexão entre servidor e cliente

const io = require('socket.io')(http, { // servidor ao qual iremos nos comunicar e verbos de acesso
  cors: {
    origin: 'http://localhost:3000/',
    method: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  socket.emit('entered', 'Bem vindo');
  console.log('Alguém se conectou!');
});

const { PORT = 3000 } = process.env;

app.use(cors());
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/src/views`); // aqui informamos onde as views serão procuradas

app.get('/', (_req, res) => {
  res.sendFile(`${__dirname}/src/view/index.html`);
});

http.listen(PORT, () => console.log(`App runnign on port: ${PORT}`));