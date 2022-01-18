const socket = window.io();

socket.emit('message', { chatMessage: 'Message', nickname: 'eullerbraz' });

socket.on('message', (message) => {
  console.log(message);
});
