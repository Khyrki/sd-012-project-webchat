const socket = window.io();

const testid = 'data-testid';
const onUser = 'online-user';

const nicknameBox = document.getElementById('nickname-box');
const nicknameForm = document.getElementById('nickname-form');
const onlineUsers = document.getElementById('online-users');
const nickname = document.getElementById(onUser);
const messages = document.getElementById('messages');
const messageBox = document.getElementById('message-box');
const messageBtn = document.getElementById('send-button');

socket.on('user', ({ nickname: userName, onlineUsers: on }) => {
  if (userName === nickname.innerText || !nickname.innerText) {
    nickname.innerText = userName;
    sessionStorage.setItem('nickname', JSON.stringify(nickname.innerText));
  }
  const filteredUsers = on.filter(({ id }) => id !== socket.id);
  onlineUsers.innerHTML = '';
  onlineUsers.appendChild(nickname);
  if (filteredUsers.length) {
    filteredUsers.forEach(({ nickname: user }) => {
      console.log(user);
      const li = document.createElement('li');
      li.innerText = user;
      li.setAttribute(testid, onUser);
      li.classList.add('user');
      onlineUsers.appendChild(li);
    });
  }
});

socket.on('disconnectUser', (users) => {
  onlineUsers.innerHTML = '';
  onlineUsers.appendChild(nickname);
  users.filter(({ id }) => id !== socket.id).forEach(({ nickname: user }) => {
    const li = document.createElement('li');
    li.innerText = user;
    li.setAttribute(testid, onUser);
    onlineUsers.appendChild(li);
    return false;
  });
});

window.addEventListener('load', () => {
  socket.emit('user');
  socket.emit('messagesHistory');
});

messageBtn.addEventListener('click', () => {
  socket.emit('message',
  { chatMessage: messageBox.value, nickname: JSON.parse(sessionStorage.getItem('nickname')) });
  messageBox.value = '';
});

nicknameForm.addEventListener('submit', (e) => {
  e.preventDefault();
  nickname.innerText = nicknameBox.value;
  console.log('AQUI', nickname.innerText);
  socket.emit('changeName',
  { id: socket.id, newNick: nicknameBox.value });
  sessionStorage.setItem('nickname', JSON.stringify(nicknameBox.value));
  nicknameBox.value = '';
});

socket.on('message', (message) => {
  const liMessage = document.createElement('li');
  liMessage.innerText = message;
  liMessage.setAttribute(testid, 'message');
  messages.appendChild(liMessage);
  console.log(message);
});

socket.on('messagesHistory', (msgs) => {
  console.log(msgs);
  messages.innerHTML = '';
  msgs.forEach((message) => {
    const li = document.createElement('li');
    li.innerText = `${message.timestamp} - ${message.nickname}: ${message.message}`;
    li.setAttribute(testid, 'message');
    li.classList.add('message');
    messages.appendChild(li);
  });
});