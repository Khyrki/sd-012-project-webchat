const { OK } = require('http-status-codes').StatusCodes;
const cors = require('cors');
const express = require('express');
const path = require('path');

const app = express();
const http = require('http').createServer(app);

const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(cors());

app.use('/css', express.static(`${__dirname}/views/css`));
app.use('/js', express.static(`${__dirname}/views/js`));

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

require('./chat')(io);
const { findAllUsers } = require('./Utils/chat');
const { findAllMessages } = require('./models/messages');

app.get('/', async (_req, res) => {
  const messages = await findAllMessages();
  const users = findAllUsers();
  res.status(OK).render('index', { messages, users });
});

http.listen(PORT, () => {
  console.log(`Escutando na porta ${PORT}`);
}); 