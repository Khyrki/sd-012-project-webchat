const socket = window.io();

const nicknameDisplayer = document.getElementById('userNickname');
const nicknameInput = document.getElementById('nicknameInput');
const messageBox = document.getElementById('messageBox');
// const sendButton = document.getElementById('sendButton');
const messageForm = document.getElementById('messageForm');
const nicknameForm = document.getElementById('nicknameForm');
const usersUl = document.getElementById('onlineUsers');

const setNickname = (nickname) => {
  nicknameDisplayer.innerText = nickname;
};

const removeAllChildNodes = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

nicknameForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const key = nicknameDisplayer.innerText;
  const userNickname = nicknameInput.value;
  sessionStorage.setItem(key, userNickname);
  setNickname(sessionStorage.getItem(key));
  socket.emit('updateUserNickname', { key, userNickname });
  nicknameInput.value = '';
});

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const chatMessage = messageBox.value;
  const nickname = nicknameDisplayer.innerText;
  socket.emit('message', { chatMessage, nickname });
  messageBox.value = '';
  return false;
});

socket.on('newConnection', (socketId) => {
  if (sessionStorage.getItem(socketId)) {
    return setNickname(sessionStorage.getItem(socketId));
  }

  sessionStorage.setItem(socketId, socketId);

  setNickname(socketId);
});

socket.on('message', (message) => {
  const messagesUl = document.getElementById('messages');
  const li = document.createElement('li');
  li.innerText = message;
  li.setAttribute('data-testid', 'message');
  messagesUl.appendChild(li);
});

socket.on('usersOnline', (users) => {
  removeAllChildNodes(usersUl);
  const li = document.createElement('li');
  li.innerText = nicknameDisplayer.innerText;
  usersUl.appendChild(li);
  users.forEach((user) => {
    if (user === nicknameDisplayer.innerText) return;
    const lis = document.createElement('li');
    lis.innerText = user;
    lis.setAttribute('data-testid', 'online-user');
    usersUl.appendChild(lis);
  });
});