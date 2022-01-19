const socket = window.io();

const form = document.querySelector('form');
const inputMessage = document.querySelector('#messageInput');
const nickInput = document.querySelector('#nickInput');

const messagesUl = document.querySelector('#messages');

const createMessage = (msg) => {
  const li = document.createElement('li');
  li.innerText = msg;
  messagesUl.appendChild(li);
};

form.addEventListener('submit', (e) => {
  const { value: chatMessage } = inputMessage;
  const { value: nickname } = nickInput;
  e.preventDefault();
  socket.emit('message', { chatMessage, nickname });
  inputMessage.value = '';
  return false;
});

socket.on('message', (msg) => createMessage(msg));
