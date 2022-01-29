const socket = window.io();

const form = document.querySelector('form');
// const button = document.querySelector('#sendButton');
const input = document.querySelector('#messageInput');
const messages = document.querySelector('#messages');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('sendMessage', { chatMessage: input.value, nickname: 'Bruno' });
  input.value = '';
  return false;
});

const createMessage = ({ chatMessage, nickname }) => {
  const li = document.createElement('li');
  li.innerText = `${nickname} - ${chatMessage}`;
  messages.appendChild(li);
};

socket.on('newMessage', (messageObj) => createMessage(messageObj));