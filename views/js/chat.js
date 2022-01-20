const socket = window.io();

const ul = document.querySelector('#message');
const form = document.querySelector('#formMessage');
const messageInput = document.querySelector('#messageInput');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  socket.emit('message', {
    nickname: 'Martin',
    chatMessage: messageInput.value,
  });
  messageInput.value = '';
  return false;
});

const createMessage = (message) => {
  const li = document.createElement('li');
  li.innerText = message;
  ul.appendChild(li);
};
socket.on('welcome', (message) => createMessage(message));
socket.on('message', (message) => createMessage(message));
