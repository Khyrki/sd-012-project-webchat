const getDate = require('../helpers/getDate');
const msgModel = require('../models/messages');

let onlineUsers = [];

const newUser = (io, socket) => {
    socket.on('newUser', ({ id, nickname }) => {
        onlineUsers.push({ id, nickname });
        io.emit('onlineUsers', onlineUsers);
    });
};

const message = (io, socket) => {
    socket.on('message', ({ chatMessage, nickname }) => {
        const date = getDate();
        io.emit('message', `${date} - ${nickname} ${chatMessage}`);
        msgModel.create({ chatMessage, nickname, date });
    });
};

const changeNick = (io, socket) => {
    socket.on('changeNick', ({ nickname }) => {
        const user = onlineUsers.find((selUser) => selUser.id === socket.id);
        user.nickname = nickname;
        io.emit('onlineUsers', onlineUsers);
    });
};

const disconnect = (io, socket) => {
    socket.on('disconnect', () => {
        onlineUsers = onlineUsers.filter(({ id }) => id !== socket.id);
        io.emit('onlineUsers', onlineUsers);
    });
};

module.exports = (io) => {
    io.on('connection', (socket) => {
        newUser(io, socket);
        message(io, socket);
        changeNick(io, socket);
        disconnect(io, socket);
    });
};