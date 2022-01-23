const socket = window.io();

const formNickname = document.querySelector('.nickname-form');
const nicknameInput = document.querySelector('.nickname-input');
const nicknameTilte = document.querySelector('.nickname');
const formMessage = document.querySelector('.message-form');
const inputMessage = document.querySelector('.message-input');
const messageList = document.querySelector('.messages-list');

let nickname = '';

const createListMessage = (message) => {
  const li = document.createElement('li');
  li.innerText = message;
  li.setAttribute('data-testid', 'message');
  messageList.appendChild(li);
};

formMessage.addEventListener('submit', (event) => {
  event.preventDefault();
  const chatMessage = inputMessage.value;
  socket.emit('message', { chatMessage, nickname });
  inputMessage.value = '';
  return false;
});

socket.on('message', (message) => {
  createListMessage(message);
});

socket.on('randonNick', (nick) => {
  nicknameTilte.innerText = nick;
  nickname = nick;
});

formNickname.addEventListener('submit', (event) => {
  event.preventDefault();
  const newNick = nicknameInput.value;
  nicknameTilte.innerText = newNick;
  nickname = newNick;
  socket.emit('changeNick', newNick);
  nicknameInput.value = '';
  return false;
});