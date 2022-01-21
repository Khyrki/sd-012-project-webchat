const socket = window.io();

// user

const userList = document.querySelector('.user-list');
const nicknameForm = document.querySelector('.nickname-form');
const nicknameInput = document.querySelector('.nickname-input');

nicknameForm.addEventListener('submit', (e) => {
  e.preventDefault();
  sessionStorage.setItem('nickname', nicknameInput.value);
  socket.emit('changeNickname', nicknameInput.value);
  nicknameInput.value = '';
});

socket.on('updateConnectedUsers', (connectedUsers) => {
  userList.innerHTML = '';
  connectedUsers.forEach(({ nickname }) => {
    const userLi = document.createElement('li');
    userLi.innerHTML = nickname;
    userLi.className = 'user';
    userLi.setAttribute('data-testid', 'online-user');
    userList.appendChild(userLi);
  });
});

socket.on('storeNickname', (nickname) => sessionStorage.setItem('nickname', nickname));

// chat

const messageForm = document.querySelector('.message-form');
const messageInput = document.querySelector('.message-input');
const messageList = document.querySelector('.message-list');

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const chatMessage = messageInput.value;
  const nickname = sessionStorage.getItem('nickname');
  socket.emit('message', { chatMessage, nickname });
  messageInput.value = '';
});

socket.on('message', (message) => {
  const newMessage = document.createElement('li');
  newMessage.innerHTML = message;
  newMessage.className = 'message';
  newMessage.setAttribute('data-testid', 'message');
  messageList.appendChild(newMessage);
});
