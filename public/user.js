const socket = window.io();

socket.emit('message', { chatMessage: 'Olha a mensagem', nickname: 'Me leia' });

socket.on('message', (msg) => {
  console.log(msg);
});