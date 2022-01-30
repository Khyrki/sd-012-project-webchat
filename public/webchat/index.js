const socket = window.io();
// const crypto = require('crypto');

const datatestid = 'data-testid';

const formMessage = document.getElementById('form-message');
const formNickname = document.getElementById('form-nickname');
const inputMessage = document.getElementById('input-message');
const inputNickname = document.getElementById('input-nickname');
const messageList = document.getElementById('message-list');
const userSpan = document.querySelector('#online-user');
const usersList = document.getElementById('users');

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

const newUser = () => {
  const alreadyExists = sessionStorage.getItem('nickname');

  const newU = alreadyExists || randomString();
  userSpan.innerHTML = newU;
  socket.emit('user', newU);
};

formNickname.addEventListener('submit', (e) => {
  e.preventDefault();

  if (inputNickname.value === '') {
    sessionStorage.setItem('nickname', randomString());
    socket.emit('userUpdate', randomString());
    return false;
  }

  userSpan.innerHTML = inputNickname.value;
  sessionStorage.setItem('nickname', inputNickname.value);
  socket.emit('userUpdate', inputNickname.value);
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

const createAllMessages = (msgList) => {
  if (msgList) {
    messageList.innerText = '';
    msgList.forEach((m) => {
      const li = document.createElement('li');
      li.setAttribute(datatestid, 'message');
      li.innerText = `${m.timestamp} - ${m.nickname}: ${m.message}`;
      messageList.appendChild(li);
    });
  }
};

const createUsers = (users) => {
  usersList.innerHTML = '';

  users.forEach((user) => {
    const currentUser = userSpan.innerHTML;
    if (currentUser === user.nickname) return null;
    const li = document.createElement('li');
    li.setAttribute(datatestid, 'online-user');
    li.innerText = user.nickname;
    usersList.appendChild(li);
    return false;
  });
};

socket.on('message', (message) => createMessage(message));
socket.on('findAllMessages', (allMessages) => createAllMessages(allMessages));
socket.on('serverMessage', (serverMessage) => createMessage(serverMessage));
socket.on('user', (users) => createUsers(users));

window.addEventListener('load', () => {
  newUser();
});

window.onbeforeunload = () => {
  socket.disconnect();
};
