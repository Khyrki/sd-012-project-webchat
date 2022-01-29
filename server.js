/* eslint-disable max-lines-per-function */
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const moment = require('moment');

const { PORT = 3000 } = process.env;

let usersConnected = [];

function stringGenerator(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let generatedString = '';

    for (let i = 0; i < length; i += 1) {
        generatedString += characters[Math.floor(Math.random() * characters.length)];
    }
    return generatedString;
}

const app = express();

const socketIoServer = require('http').createServer(app);

const io = require('socket.io')(socketIoServer, {
    cors: {
        origin: `http://localhost:${PORT}`,
        methods: ['GET', 'POST'],
    },
});
const history = require('./models/history');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(
    cors({
        origin: `http://localhost:${PORT}`,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Authorization'],
    }),
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    const historyMessage = await history.messageHistory();
    res.render('home.ejs', { history: historyMessage });
});

io.on('connect', async (socket) => {
    const usernameRandom = stringGenerator(16);
    socket.emit('username', usernameRandom);
    usersConnected.push({ nickname: usernameRandom, socketId: socket.id });
    io.emit('online', usersConnected);
    socket.on('message', async (data) => {
        const dateFormat = moment().format('DD-MM-yyyy HH:mm:ss');
        await history.send({ message: data.chatMessage, 
          nickname: data.nickname,
          timestamp: dateFormat });
        io.emit('message', `${dateFormat} - ${data.nickname}: ${data.chatMessage}`);
    });
    socket.on('updateNickname', (data) => {
        const index = usersConnected.findIndex((element) => element.socketId === socket.id);
        usersConnected[index] = { nickname: data, socketId: socket.id };
        io.emit('online', usersConnected);
    });
    socket.on('disconnect', () => {
        usersConnected = usersConnected.filter((element) => element.socketId !== socket.id);
        io.emit('online', usersConnected);
    });
});

socketIoServer.listen(PORT);

console.log(`WebChat ouvindo na porta ${PORT}`);