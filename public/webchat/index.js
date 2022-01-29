const socket = window.io();
// const crypto = require('crypto');

const datatestid = 'data-testid';

const formMessage = document.getElementById('form-message');
const formNickname = document.getElementById('form-nickname');
const inputMessage = document.getElementById('input-message');
const nicknameInput = document.getElementById('input-nickname');
const messageList = document.getElementById('message-list');
const userSpan = document.querySelector('#online-user');

const createMessage = (message) => {
  if (typeof message === 'string') {
    const li = document.createElement('li');
    li.setAttribute(datatestid, 'message');
    li.innerText = message;
    messageList.appendChild(li);
    return false;
  }
};

const randomString = () => {
  const alphanumeric = 'abcdefghijklmnopqrstuvwxxyz0123456789';
  const randomS = [];
  const anSplit = alphanumeric.split('');

  for (let index = 0; randomS.length < 16; index = (Math.floor(Math.random() * 10))) {
    randomS.push(anSplit[index]);
  }

  return randomS.join('');
};

const user = () => {
  const alreadyExists = sessionStorage.getItem('nickname');

  const newU = alreadyExists || randomString();
  userSpan.innerHTML = newU;
  socket.emit('user', newU);
};

formNickname.addEventListener('submit', (e) => {
  e.preventDefault();

  if (nicknameInput.value === '') {
    sessionStorage.setItem('nickname', randomString());
    socket.emit('userUpdate', randomString());
    return false;
  }

  userSpan.innerHTML = nicknameInput.value;
  sessionStorage.setItem('nickname', nicknameInput.value);
  socket.emit('userUpdate', nicknameInput.value);
});

formMessage.addEventListener('submit', (e) => {
  e.preventDefault();

  const message = {
    chatMessage: inputMessage.value,
    nickname: sessionStorage.getItem('nickname'),
  };

  socket.emit('message', message);
  inputMessage.value = '';
  return false;
});

socket.on('message', (message) => createMessage(message));

window.addEventListener('load', () => {
  user();
});

window.onbeforeunload = () => {
  socket.disconnect();
};
