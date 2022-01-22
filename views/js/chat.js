const socket = window.io();
const ul = document.querySelector('#chatUl');
const form = document.querySelector('#formMessage');
const messageInput = document.querySelector('#messageInput');
const name = document.querySelector('#nickname');

// const { createUser } = require('./mainUsers');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  socket.emit('message', {
    nickname: name.value,
    chatMessage: messageInput.value,
  }); 
  messageInput.value = '';
  return false;
});

const createMessage = (message) => {
  const li = document.createElement('li');
  li.dataset.testid = 'message';
  li.innerText = message;
  ul.appendChild(li);
};

socket.on('welcome', (message) => createMessage(message));
socket.on('message', (message) => createMessage(message));
