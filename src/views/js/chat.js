const socket = window.io();

const nicknameForm = document.querySelector('#nicknameForm');
const nicknameInput = document.querySelector('#nicknameInput');
const messageForm = document.querySelector('#messageForm');
const messageInput = document.querySelector('#messageInput');
const messages = document.querySelector('#messages');

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const nickname = sessionStorage.getItem('nickname');
  const chatMessage = messageInput.value;
  socket.emit('sendMessage', { chatMessage, nickname });
  messageInput.value = '';
  return false;
});

nicknameForm.addEventListener('submit', (e) => {
  e.preventDefault();
  sessionStorage.setItem('nickname', nicknameInput.value);
  nicknameInput.name = '';
  return false;
});

const createMessage = ({ chatMessage, nickname }) => {
  const li = document.createElement('li');
  li.innerText = `${nickname} - ${chatMessage}`;
  messages.appendChild(li);
};

socket.on('newMessage', (messageObj) => createMessage(messageObj));