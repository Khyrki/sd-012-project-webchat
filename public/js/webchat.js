const socket = window.io();

const formButton = document.getElementById('formButton');
const inputName = document.getElementById('inputName');
const inputMessage = document.getElementById('inputMessage');
const chat = document.getElementById('chat');
const labelNickname = document.getElementById('online-user');
const btnRename = document.getElementById('btnRename');

// const arrMessages = [];

let users = [...Array(16)]
  .map((_i) => Math.floor(Math.random() * 36).toString(36))
  .join('');

labelNickname.innerText = users;

formButton.addEventListener('click', (e) => {
  e.preventDefault();
  socket.emit('message', { chatMessage: inputMessage.value, nickname: inputName.value });
  inputMessage.value = '';
  inputName.value = '';
});

btnRename.addEventListener('click', (e) => {
  e.preventDefault();
  users = inputName.value;
  labelNickname.innerText = users;
});

const renderChat = (message) => {
  const li = document.createElement('li');
  li.dataset.testid = 'message';
  li.innerText = message;
  chat.appendChild(li);
};

const getAllMessages = (arrMessages) => {
  arrMessages.forEach(({ message, nickname, timestamp }) => {
    renderChat(`${timestamp} - ${nickname}: ${message}`);
  });
};

socket.on('message', (message) => renderChat(message));
socket.on('getMessages', (arrMessages) => getAllMessages(arrMessages));
