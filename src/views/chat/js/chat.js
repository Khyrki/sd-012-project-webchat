const socket = window.io();

const dataTestId = 'data-testid';

const userBox = document.querySelector('.nickBox');
const userNick = document.querySelector('.nickInput');
const messageBox = document.querySelector('.messageBox');
const inputMessage = document.querySelector('.messageInput');

messageBox.addEventListener('submit', (e) => {
  e.preventDefault();
  const chatMessage = inputMessage.value;
  const nickname = localStorage.getItem(socket.id);
  socket.emit('message', { chatMessage, nickname });
  inputMessage.value = '';
  return false;
});

userBox.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('clientUser', userNick.value);
  userNick.value = '';
  return false;
});

const loadMessages = (messageInfo) => {
  const { nickname, message, timestamp } = messageInfo;
  const messagesUl = document.querySelector('.messages');
  const li = document.createElement('li');
  li.innerText = `${timestamp} - ${nickname}: ${message}`;
  li.setAttribute(dataTestId, 'message');
  messagesUl.appendChild(li);
};

const getAllUsers = () => {
  const allUsers = Object.keys(localStorage).map((id) => {
    const nickname = localStorage.getItem(id);
    return { id, nickname };
  });

  return allUsers;
};

const createMessage = (message) => {
  const messagesUl = document.querySelector('.messages');
  const li = document.createElement('li');
  socket.emit('saveMessage', message);
  li.innerText = message;
  li.setAttribute(dataTestId, 'message');
  messagesUl.appendChild(li);
};

const deleteUser = (userId) => {
  const messagesUl = document.querySelector('.users');
  const user = document.getElementById(userId);
  if (!user) return false;
  messagesUl.removeChild(user);
};

const createUser = (nicknameInfo) => {
  const { id, nickname } = nicknameInfo;
  const user = document.getElementById(id);
  if (user && user.innerText === nickname) return false;
  localStorage.setItem(id, nickname);
  const usersUl = document.querySelector('.users');
  if (user && user.innerText !== nickname) deleteUser(id);
  const li = document.createElement('li');
  li.innerText = nickname;
  li.setAttribute(dataTestId, 'online-user');
  li.setAttribute('id', id);
  usersUl.appendChild(li);
};

const users = getAllUsers();

socket.on('loadMessages', (messageInfo) => loadMessages(messageInfo));
socket.on('message', (message) => createMessage(message));
socket.on('createUser', (nicknameInfo) => createUser(nicknameInfo));
socket.on('deleteUser', (userId) => {
  localStorage.removeItem(userId);
  deleteUser(userId);
});

socket.emit('joinRoom');
socket.emit('loadChat');
if (users.length > 0) socket.emit('loadUsers', users);

window.onbeforeunload = (_event) => {
  socket.disconnect();
};