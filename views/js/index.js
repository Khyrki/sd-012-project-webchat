const socket = window.io();

const messageForm = document.querySelector('#messageForm');
const inputMessage = document.querySelector('#messageInput');
const userForm = document.querySelector('#login');
const inputUser = document.querySelector('#nickNameInput');

const createLi = (liText, ulId, dataTextId) => {
  const ul = document.querySelector(ulId);
  const li = document.createElement('li');
  li.setAttribute('data-testid', dataTextId);
  li.innerText = liText;
  ul.appendChild(li);
};

socket.on('reconnect', (messages) => messages
  .forEach(({ message, nickname, timestamp }) => createLi(
    `${timestamp} - ${nickname}: ${message}`,
    '#messages',
    'message',
)));

let usersList = [];

const nicknameFind = (id, users) => users.find((user) => user.id === id);

userForm.addEventListener('submit', (e) => {
  e.preventDefault();

  socket.emit('login', { newName: inputUser.value });
  
  inputUser.value = '';
  return false;
});

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const user = nicknameFind(socket.id, usersList);
  
  socket.emit('message', { chatMessage: inputMessage.value, nickname: user.nickname });
  
  inputMessage.value = '';
  return false;
});

socket.on('userOnline', (users) => {
  usersList = users;
  const usersUl = document.querySelector('#users');
  usersUl.innerHTML = '';

  usersList.forEach(({ nickname }) => createLi(nickname, '#users', 'online-user'));
});

socket.on('message', (chatMessage) => createLi(chatMessage, '#messages', 'message'));
