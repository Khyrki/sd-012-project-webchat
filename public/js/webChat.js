const socket = window.io();

const datatest = 'data-testid';

const messageList = document.getElementById('message-list');
const formMessage = document.getElementById('formMessage');
const formNickname = document.getElementById('formNickname');
const messageInput = document.getElementById('input-msg');
const nicknameInput = document.getElementById('input-nickname');
const userSpan = document.querySelector('#online-user');

const renderMessage = (msg) => {
  if (typeof msg === 'string') {
    const li = document.createElement('li');
    li.setAttribute(datatest, 'message');
    li.innerText = msg;
    messageList.appendChild(li);
    return false;
  }
};

const randomString = () => {
  const alphanumeric = 'abcdefghijklmnopqrstuvwxxyz0123456789';
  const randomS = [];
  const anSplit = alphanumeric.split('');

  for (let index = 0; randomS.length < 16; index = Math.floor(Math.random() * 10)) {
    randomS.push(anSplit[index]);
  }

  return randomS.join('');
};

formMessage.addEventListener('submit', (e) => {
  e.preventDefault();

  const message = {
    chatMessage: messageInput.value,
    nickname: sessionStorage.getItem('nickname'),
  };

  socket.emit('message', message);
  messageInput.value = '';
  return false;
});

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

const newUser = () => {
  const alreadyExists = sessionStorage.getItem('nickname');

  const newU = alreadyExists || randomString();
  userSpan.innerHTML = newU;
  socket.emit('user', newU);
};

const loadMessages = (messages) => {
  if (messages) {
    messageList.innerText = '';
    messages.forEach((m) => {
      const li = document.createElement('li');
      li.setAttribute(datatest, 'message');
      li.innerText = `${m.timestamp} - ${m.nickname}: ${m.message}`;
      messageList.appendChild(li);
    });
  }
};

window.addEventListener('load', () => {
  newUser();
});

socket.on('message', (msg) => renderMessage(msg));
socket.on('loadMessages', (message) => loadMessages(message));
