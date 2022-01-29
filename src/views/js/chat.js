const socket = window.io();

const nicknameShow = document.querySelector('#nicknameShow');
const nicknameForm = document.querySelector('#nicknameForm');
const nicknameInput = document.querySelector('#nicknameInput');
const messageForm = document.querySelector('#messageForm');
const messageInput = document.querySelector('#messageInput');
const messages = document.querySelector('#messages');
const userList = document.querySelector('#userList');

const dataTestId = 'data-testid';
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const generateString = (length) => {
    let result = ' ';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i += 1) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
};

// Gerador de id - https://www.programiz.com/javascript/examples/generate-random-strings

if (!sessionStorage.getItem('nickname')) {
  const nickname = generateString(16).trim();
  sessionStorage.setItem('nickname', nickname);
  nicknameShow.innerText = nickname;
} 

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const nickname = sessionStorage.getItem('nickname');
  const chatMessage = messageInput.value;
  socket.emit('message', { chatMessage, nickname });
  messageInput.value = '';
  return false;
});

nicknameForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const nickname = sessionStorage.getItem('nickname');
  const newNickname = nicknameInput.value;
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const newUsers = users.map((user) => {
    if (user === nickname) {
       return newNickname;
    }
    return user;
  });
  localStorage.setItem('users', JSON.stringify(newUsers));
  sessionStorage.setItem('nickname', newNickname);
  nicknameShow.innerText = newNickname;
  nicknameInput.value = '';
  socket.emit('change');
  return false;
});

const refreshUsers = () => {
  const nickname = sessionStorage.getItem('nickname');
  userList.innerHTML = '';
  const users = JSON.parse(localStorage.getItem('users')) || [];
  users.forEach((user) => {
    if (user !== nickname) {
      const li = document.createElement('li');
      li.innerText = user;
      li.setAttribute(dataTestId, 'online-user');
      userList.appendChild(li);
    }
  });
};

const createUser = () => {
  const nickname = sessionStorage.getItem('nickname');
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const finded = users.find((user) => user === nickname);
  if (finded) {
    return;  
  }
  users.push(nickname);
  localStorage.setItem('users', JSON.stringify(users));
  socket.emit('userAdd');
};

const createMessage = (message) => {
  const li = document.createElement('li');
  li.innerText = message;
  li.setAttribute(dataTestId, 'message');
  messages.appendChild(li);
};

const createHistory = (history) => {
  history.forEach(({ message, nickname, timestamp }) => {
    const li = document.createElement('li');
    li.innerText = `(${timestamp}) ${nickname}: ${message}`;
    li.setAttribute(dataTestId, 'message');
    messages.appendChild(li);
  });
};

const deleteUser = () => {
  const nickname = sessionStorage.getItem('nickname');
  const users = JSON.parse(localStorage.getItem('users'));
  const newUsers = users.filter((user) => {
    if (user !== nickname) {
      return user;
    }
    return false;
  });
  localStorage.setItem('users', JSON.stringify(newUsers));
};

socket.emit('newConnection', sessionStorage.getItem('nickname'));
socket.on('message', (message) => createMessage(message));
socket.on('sendHistory', (history) => createHistory(history));
socket.on('deleteUser', () => refreshUsers());
socket.on('userConnected', () => createUser());
socket.on('refresh', () => refreshUsers());
socket.on('userChanged', () => refreshUsers());

window.onbeforeunload = () => {
  deleteUser();
  socket.emit('change');
  socket.disconnect();
};