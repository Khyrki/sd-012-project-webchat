const crypto = require('crypto');
const { createMessages } = require('../models/chatModel');

const day = new Date().getDate();
const month = new Date().getMonth() + 1;
const year = new Date().getFullYear();
const hour = new Date().getHours();
const minute = new Date().getMinutes();
const second = new Date().getSeconds();
const amPm = hour < 12 ? 'AM' : 'PM';
const treatedHour = hour - 12;
const treatedMonth = month < 10 ? `0${month}` : month;

const timeStamp = `${day}-${treatedMonth}-${year} ${treatedHour}:${minute}:${second} ${amPm}`;
let users = [];

const changeNickname = (socket, io) => {
    socket.on('changeNickname', (nickname) => {
        const { id } = socket;
        const newUserNickname = { nickname, id };
        users = users.filter((user) => user.id !== id);        
        users.push(newUserNickname);
        io.emit('updateUsers', users);   
    });
};

const createMessage = (socket, io) => {
    socket.on('message', async ({ chatMessage, nickname }) => {
        io.emit('message', `${timeStamp} ${nickname}: ${chatMessage}`);        
        await createMessages({ message: chatMessage, nickname, timeStamp });             
    });
};

module.exports = (io) => io.on('connection', (socket) => {
    const { id } = socket;    
    const nickname = crypto.randomBytes(8).toString('hex');    
    const newUser = { nickname, id };
    users.push(newUser);
    socket.broadcast.emit('updateUsers', users);
    socket.emit('updateUsers', users.reverse());
    socket.emit('connection', ({ nickname, id }));
    createMessage(socket, io);  
    changeNickname(socket, io);
    socket.on('disconnect', () => {                
        users = users.filter((user) => user.id !== id);        
        io.emit('updateUsers', users);        
    });
});