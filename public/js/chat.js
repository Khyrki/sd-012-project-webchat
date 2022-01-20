const socket = window.io();

const loginForm = document.querySelector('.login-form');
const nicknameInput = document.querySelector('.nickname-input');
const messageForm = document.querySelector('.message-form');
const messageInput = document.querySelector('.message-input');
const usersList = document.querySelector('#users-list');
const messagesList = document.querySelector('#messages');

const dataTestid = 'data-testid';

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  console.log('aea');
  sessionStorage.setItem('nick', nicknameInput.value);

  nicknameInput.value = '';
  return false;
});

messageForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const nickname = sessionStorage.getItem('nick');
  const chatMessage = messageInput.value;
  socket.emit('message', { chatMessage, nickname });
  messageInput.value = '';
  return false;
});

const createMessage = (message) => {
  if (typeof message === 'string') {
    const li = document.createElement('li');
    li.setAttribute(dataTestid, 'message');
    li.innerText = message;
    messagesList.appendChild(li);
  }
  message.forEach((msg) => {
    const li = document.createElement('li');
    li.setAttribute(dataTestid, 'message');
    li.innerText = `${msg.timestamp} - ${msg.nickname} - ${msg.message}`;
    messagesList.appendChild(li);
  });
};

const createUser = (user) => {
  console.log(user);
  sessionStorage.setItem('nickname', user);
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'online-user');
  li.innerText = user;
  usersList.appendChild(li);
};

socket.on('message', (message) => createMessage(message));
socket.on('user', (user) => createUser(user));
socket.on('loadMessages', (messages) => createMessage(messages));

window.addEventListener('load', () => {
  socket.emit('user');
  socket.emit('loadMessages');
});
