const socket = window.io();

const nicknameBox = document.getElementById('nickname-box');
const nicknameForm = document.getElementById('nickname-form');
// const onlineUsers = document.getElementById('online-users');
const nickname = document.getElementById('online-user');
const messages = document.getElementById('messages');
const messageBox = document.getElementById('message-box');
const messageBtn = document.getElementById('send-button');

socket.on('user', (userName) => {
  nickname.innerText = userName;
  sessionStorage.setItem('nickname', JSON.stringify(nickname.innerText));
});

window.addEventListener('load', () => {
  socket.emit('user');
  socket.emit('messagesHistory');
});

messageBtn.addEventListener('click', () => {
  socket.emit('message',
  { chatMessage: messageBox.value, nickname: JSON.parse(sessionStorage.getItem('nickname')) });
  messageBox.value = '';
});

nicknameForm.addEventListener('submit', (e) => {
  e.preventDefault();
  nickname.innerText = nicknameBox.value;
  sessionStorage.setItem('nickname', JSON.stringify(nicknameBox.value));
  nicknameBox.value = '';
});

socket.on('message', (message) => {
  const liMessage = document.createElement('li');
  liMessage.innerText = message;
  liMessage.setAttribute('data-testid', 'message');
  messages.appendChild(liMessage);
  console.log(message);
});

socket.on('messagesHistory', (msgs) => {
  msgs.forEach((message) => {
    const li = document.createElement('li');
    li.innerText = `${message.date} - ${message.nickname}: ${message.chatMessage}`;
    li.setAttribute('data-testid', 'message');
  });
});