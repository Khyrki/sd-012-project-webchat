const socket = window.io();

const form = document.querySelector('.form');
const inputMessage = document.querySelector('.message-input');
const nameUser = document.querySelector('.nickname-input');
const messagesUl = document.querySelector('.messages');
const tokenUser = document.querySelector('.token-user');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('message', { chatMessage: inputMessage.value, nickname: nameUser.value });
  inputMessage.value = '';
  nameUser.value = '';
});

const createMessage = (message) => {
  const li = document.createElement('li');
  li.dataset.testid = 'message';
  li.innerText = message;
  messagesUl.appendChild(li);
};

const createToken = (token) => {
  tokenUser.innerText = token;
};

const getAll = (data) => {
  data.forEach(({ nickname, message, timestamp }) => {
    createMessage(`${timestamp} - ${nickname}: ${message}`);
  });
};

socket.on('message', (message) => createMessage(message));
socket.on('token', (token) => createToken(token));
socket.on('allData', (data) => getAll(data));
