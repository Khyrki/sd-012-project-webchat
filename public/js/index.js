const socket = window.io();

// user

const userList = document.querySelector('.user-list');
const nicknameForm = document.querySelector('.nickname-form');
const nicknameInput = document.querySelector('.nickname-input');

const testId = 'data-testid';

const socketUser = (connectedUsers) => {
  const user = connectedUsers.find(({ id }) => id === socket.id);
  const socketUserLi = document.createElement('li');
  socketUserLi.innerHTML = user.nickname;
  socketUserLi.className = 'user';
  socketUserLi.setAttribute(testId, 'online-user');
  return socketUserLi;
};

nicknameForm.addEventListener('submit', (e) => {
  e.preventDefault();
  sessionStorage.setItem('nickname', nicknameInput.value);
  socket.emit('changeNickname', nicknameInput.value);
  nicknameInput.value = '';
});

socket.on('updateConnectedUsers', (connectedUsers) => {
  userList.innerHTML = '';
  userList.appendChild(socketUser(connectedUsers));
  connectedUsers.filter(({ id }) => id !== socket.id).forEach(({ nickname }) => {
    const userLi = document.createElement('li');
    userLi.innerHTML = nickname;
    userLi.className = 'user';
    userLi.setAttribute(testId, 'online-user');
    userList.appendChild(userLi);
  });
});

socket.on('storeNickname', (nickname) => sessionStorage.setItem('nickname', nickname));

// chat

const messageForm = document.querySelector('.message-form');
const messageInput = document.querySelector('.message-input');
const messageList = document.querySelector('.message-list');

const genNewMessage = (message) => {
  const newMessage = document.createElement('li');
  newMessage.innerHTML = message;
  newMessage.className = 'message';
  newMessage.setAttribute(testId, 'message');
  return newMessage;
};

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const chatMessage = messageInput.value;
  const date = new Date();
  const nickname = sessionStorage.getItem('nickname');
  socket.emit('message', { chatMessage, nickname, date });
  messageInput.value = '';
});

socket.on('message', (message) => {
  const newMessage = genNewMessage(message);
  messageList.appendChild(newMessage);
});

socket.on('history', (messagesHistory) => {
  messagesHistory.forEach(({ message, nickname, timestamp }) => {
    const serializedMsg = `${timestamp} - ${nickname}: ${message}`;
    const newMessage = genNewMessage(serializedMsg);
    messageList.appendChild(newMessage);
  });
});