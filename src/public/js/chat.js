const socket = window.io();

// envia msg p servidor
const formMessages = document.querySelector('#message-form');
const inputMessage = document.querySelector('#messageInput');
formMessages.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('clientMessage', inputMessage.value);
  inputMessage.value = '';
  return false;
});

const createMessage = (message) => {
  console.log(message);
  const messageUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerText = message;
  messageUl.appendChild(li);
};

// escuta msg do server
socket.on('serverMessage', (message) => createMessage(message));