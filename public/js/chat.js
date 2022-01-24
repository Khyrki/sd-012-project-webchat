const socket = window.io();

const form = document.querySelector('form');
const inputMessage = document.querySelector('#messageInput');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  socket.emit('message', inputMessage.value);
  inputMessage.value = '';
  return false;
}); 