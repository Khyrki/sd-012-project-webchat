const socket = window.io();

const webchat = document.querySelector('.webchat-form');
const input = document.querySelector('.input-message');

const submitForm = (event) => {
  event.preventDefault();

  socket.emit('message', {
    chatMessage: input.value,
  });

  input.value = '';

  return false;
};

webchat.addEventListener('submit', (event) => submitForm(event));

const createNewMessage = (message) => {
  console.log(message);
};

socket.on('serverMsg', (message) => createNewMessage(message));