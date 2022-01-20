const getDate = require('../helpers/getDate');

const onlineUsers = [];

module.exports = (io) => {
    io.on('connection', (socket) => {
        // socket.emit('sendHistory', CHAT_HISTORY);
        // const defaultNick = socket.id.substring(0, 16);
        // onlineUsers.push({ id: socket.id, nickname: defaultNick });
        // socket.emit('changeNick', defaultNick);

        console.log(socket.id);

        socket.on('newUser', ({ id, nickname }) => {
            onlineUsers.push({ id, nickname });
        });
        
        socket.on('message', ({ chatMessage, nickname }) => {
            io.emit('message', `${getDate()} - ${nickname} ${chatMessage}`);
        });
        
        socket.on('newNick', ({ newNick }) => {
            const user = onlineUsers.find((selUser) => selUser.id === socket.id);
            user.nickname = newNick;
            socket.emit('changeNick', newNick);
            io.emit('usersList', onlineUsers);
        });
    });
};