const crypto = require('crypto');

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

module.exports = (io) => io.on('connection', (socket) => {
    const randomNickname = crypto.randomBytes(8).toString('hex');
    socket.emit('connection', ({ nickname: randomNickname, id: socket.id }));
    socket.on('message', ({ chatMessage, nickname }) => {               
        io.emit('message', `${timeStamp} ${nickname}: ${chatMessage}`);        
    });
    socket.on('changeNickname', (nickname) => {        
        io.emit('changeNickname', { id: socket.id, nickname });
    });
});