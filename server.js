const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const moment = require('moment');
const { findMessages, saveChat } = require('./models/chatModel');
const { disconnect } = require('./disconnectEvent');

const app = express();
const server = http.createServer(app);

const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.use('/statics', express.static('./statics/'));

const listUsers = [];

io.on('connection', async (socket) => {
    const dbMessages = await findMessages();
    socket.emit('allMessages', dbMessages);

    // Client on
    socket.on('clientOn', (nickname) => {
        listUsers.push({ id: socket.id, nickname });
        io.emit('clientOn', listUsers);
    });

    socket.on('message', ({ chatMessage, nickname }) => {
        const timestamp = moment().format('DD-MM-YYYY HH:mm:ss');
        saveChat(nickname, chatMessage, timestamp);
        io.emit('message', `${timestamp} - ${nickname}: ${chatMessage}`);
    });

    socket.on('disconnect', () => {
        disconnect(listUsers, socket.id);
        io.emit('clientOn', listUsers);
    });
});

io.on('connection', (socket) => {
    socket.on('nicknameChange', (userChange) => {
        console.log(userChange);
        listUsers.forEach((element, index) => {
        if (element.id === socket.id) {
        listUsers[index].nickname = userChange;
        }
    });
    io.emit('clientOn', listUsers);
    });
});

const PORT = 3000;
server.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}`));