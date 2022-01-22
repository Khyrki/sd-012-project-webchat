const socket = window.io();

const datatest = 'data-testid';

const loginForm = document.querySelector('.login-form');
const nicknameInput = document.querySelector('.nickname-input');

const webchatMessages = document.querySelector('.webchat-messages');
const webchatForm = document.querySelector('.webchat-form');
const messageInput = document.querySelector('.input-message');

const usersList = document.querySelector('.users-list');
const onlineUser = document.querySelector('.online-user');

const randomString = () => {
  const alphanumeric = 'abcdefghijklmnopqrstuvwxxyz0123456789';
  const randomS = [];
  const anSplit = alphanumeric.split('');

  for (let index = 0; randomS.length < 16; index = (Math.floor(Math.random() * 10))) {
    randomS.push(anSplit[index]);
  }

  return randomS.join('');
};

const createNewUser = () => {
  const userExists = sessionStorage.getItem('nickname');

  const newU = userExists || randomString();
  sessionStorage.setItem('nickname', newU);
  onlineUser.innerHTML = newU;
  socket.emit('user', newU);
};

const loadMessages = (messages) => {
  if (messages) {
    webchatMessages.innerText = '';
    messages.forEach((message) => {
      const messageElem = document.createElement('p');
      messageElem.className = 'displayed-message';
      messageElem.setAttribute(datatest, 'message');
      messageElem.innerText = `${message.timestamp} - ${message.nickname}: ${message.message}`;
      webchatMessages.appendChild(messageElem);
    });
  }
};

const createNewMessage = (message) => {
  if (typeof message === 'string') {
    const messageElem = document.createElement('p');
    messageElem.setAttribute(datatest, 'message');
    messageElem.className = 'displayed-message';
    messageElem.innerText = message;
    webchatMessages.appendChild(messageElem);
    return false;
  }
};

const renderUsers = (users) => {
  usersList.innerHTML = '';

  users.forEach((user) => {
    const currentUser = onlineUser.innerHTML;
    if (currentUser === user.nickname) return null;
    const li = document.createElement('li');
    li.setAttribute(datatest, 'online-user');
    li.innerText = user.nickname;
    usersList.appendChild(li);
    return false;
  });
};

const submitNickname = (event) => {
  event.preventDefault();

  if (nicknameInput.value === '') {
    sessionStorage.setItem('nickname', randomString());
    socket.emit('userUpdate', randomString());
    return false;
  }

  onlineUser.innerHTML = nicknameInput.value;
  sessionStorage.setItem('nickname', nicknameInput.value);
  socket.emit('userUpdate', nicknameInput.value);
};

const scrollToBottom = () => {
  webchatMessages.scrollTop = webchatMessages.scrollHeight;
};

const submitMessage = (event) => {
  event.preventDefault();
  const shouldScroll = webchatMessages.scrollTop + webchatMessages
    .clientHeight === webchatMessages.scrollHeight;

  const message = {
    chatMessage: messageInput.value,
    nickname: sessionStorage.getItem('nickname'),
  };

  socket.emit('message', message);
  messageInput.value = '';

  if (!shouldScroll) scrollToBottom();

  return false;
};

loginForm.addEventListener('submit', (event) => submitNickname(event));
webchatForm.addEventListener('submit', (event) => submitMessage(event));

socket.on('loadMessages', (message) => loadMessages(message));
socket.on('message', (msg) => createNewMessage(msg));
socket.on('user', (user) => renderUsers(user));
socket.on('loadMessages', (messages) => loadMessages(messages));
socket.on('serverMessage', (serverMessage) => createNewMessage(serverMessage));

window.addEventListener('load', () => {
  createNewUser();
  socket.emit('loadMessages');
});

window.onbeforeunload = () => {
  socket.disconnect();
};