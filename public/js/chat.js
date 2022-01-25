const socket = window.io();

const messageform = document.querySelector('#message-form');
const inputMessage = document.querySelector('#message-box');
const userform = document.querySelector('#user-form');
const usersBox = document.querySelector('#users');
const nicknameInput = document.querySelector('#nickname-box');
const onlineUser = document.querySelector('#online-user');

const DATA_TEST_ID = 'data-testid';

const createUser = () => {
  const randomNickname = socket.id.substring(0, 16);
  onlineUser.innerText = randomNickname;
  socket.emit('newUser', randomNickname);
};

socket.on('newUser', () => createUser());

socket.on('updateUsers', (onlineUsers) => {
  const users = document.querySelectorAll('li.user');
  users.forEach((user) => user.remove());
  onlineUsers.forEach(({ nickname, id }) => {
  if (id !== socket.id) {
  const li = document.createElement('li');
  li.innerText = nickname;
  li.setAttribute(DATA_TEST_ID, 'online-user');
  li.setAttribute('id', id);
  li.setAttribute('class', 'user');
  usersBox.appendChild(li);
  }
  });
});

messageform.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('message', { chatMessage: inputMessage.value, nickname: onlineUser.innerText });
  inputMessage.value = '';
  return false;
});

const createMessage = (message) => {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerText = message;
  li.setAttribute(DATA_TEST_ID, 'message');
  messagesUl.appendChild(li);
};

socket.on('connection', (allMessages) => allMessages.forEach((message) => {
  socket.emit('history', {
    chatMessage: message.message, nickname: message.nickname, timestamp: message.timestamp });
}));

socket.on('message', (message) => createMessage(message));

userform.addEventListener('submit', (e) => {
  e.preventDefault();
  onlineUser.innerText = nicknameInput.value;
  socket.emit('nicknameChange', nicknameInput.value);
  nicknameInput.value = '';
  return false;
});
