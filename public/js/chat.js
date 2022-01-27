const socket = window.io();

const form = document.querySelector('form');
const input = document.querySelector('#input');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('message', input.value);
  input.value = '';
  return false;
});

const createMessage = (message) => {
  const ul = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerText = message;
  ul.appendChild(li);
};

socket.on('message', (message) => createMessage(message));
