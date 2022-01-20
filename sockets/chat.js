const getDate = require('../helpers/getDate');

let onlineUsers = [];

// eslint-disable-next-line max-lines-per-function
module.exports = (io) => {
    io.on('connection', (socket) => {
        socket.on('newUser', ({ id, nickname }) => {
            onlineUsers.push({ id, nickname });
            io.emit('onlineUsers', onlineUsers);
        });
        
        socket.on('message', ({ chatMessage, nickname }) => {
            io.emit('message', `${getDate()} - ${nickname} ${chatMessage}`);
        });
        
        socket.on('changeNick', ({ nickname }) => {
            const user = onlineUsers.find((selUser) => selUser.id === socket.id);
            user.nickname = nickname;
            io.emit('onlineUsers', onlineUsers);
        });
        
        socket.on('disconnect', () => {
            onlineUsers = onlineUsers.filter(({ id }) => id !== socket.id);
            io.emit('onlineUsers', onlineUsers);
        });
    });
};