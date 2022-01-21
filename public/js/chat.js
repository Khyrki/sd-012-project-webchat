const socket = window.io();

const loginForm = document.querySelector('.login-form');
const nicknameInput = document.querySelector('.nickname-input');
const messageForm = document.querySelector('.message-form');
const messageInput = document.querySelector('.message-input');
const usersList = document.querySelector('#users-list');
const messagesList = document.querySelector('#messages');
const onlineUser = document.querySelector('#online-user');

const dataTestid = 'data-testid';

const randomNick = () => {
  const string = [];
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split('');
  for (let i = 16; i > 0; i -= 1) {
    string.push(chars[Math.floor(Math.random() * chars.length)]);
  }
  return string.join('');
};

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if (nicknameInput.value === '') {
    sessionStorage.setItem('nick', randomNick());
    socket.emit('nickUpdate', randomNick());
    return false;
  }

  onlineUser.innerHTML = nicknameInput.value;
  sessionStorage.setItem('nick', nicknameInput.value);
  socket.emit('nickUpdate', nicknameInput.value);
  nicknameInput.value = '';
});

const newUser = () => {
  const storageNickname = sessionStorage.getItem('nick');

  const loginUser = storageNickname || randomNick();
  onlineUser.innerHTML = loginUser;
  socket.emit('user', loginUser);
};

socket.on('user', (users) => {
  usersList.innerHTML = '';

  users.forEach((user) => {
    const currentUser = onlineUser.innerHTML;

    if (currentUser === user.nickname) return null;
    
    const li = document.createElement('li');
    li.setAttribute(dataTestid, 'online-user');
    li.innerText = user.nickname;
    usersList.appendChild(li);
    return false;
  });
});

messageForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const message = {
    nickname: sessionStorage.getItem('nick'),
    chatMessage: messageInput.value,
  };

  socket.emit('message', message);
  messageInput.value = '';
  return false;
});

const renderMessage = (msg) => {
  if (typeof msg === 'string') {
    const li = document.createElement('li');
    li.setAttribute(dataTestid, 'message');
    li.innerText = msg;
    messagesList.appendChild(li);
    return false;
  }
};

socket.on('loadMessages', (messages) => {
  if (messages) {
    messagesList.innerText = '';
    messages.forEach((message) => {
      const li = document.createElement('li');
      li.setAttribute(dataTestid, 'message');
      li.innerText = `${message.timestamp} - ${message.nickname}: ${message.message}`;
      messagesList.appendChild(li);
    });
  }
});

socket.on('message', (message) => renderMessage(message));
socket.on('loadMessages', (messages) => renderMessage(messages));

window.addEventListener('load', () => {
  newUser();
  socket.emit('loadMessages');
});

window.onbeforeunload = () => {
  socket.disconnect();
};
