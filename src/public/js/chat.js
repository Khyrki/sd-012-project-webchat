const socket = window.io();
const usersUl = document.querySelector('#users');
// const inputNickname = document.querySelector('#nicknameInput');
const formMessages = document.querySelector('#message-form');
const inputMessage = document.querySelector('#messageInput');

let nickname = '';

// envia msg p servidor
formMessages.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log(inputMessage.value);
  socket.emit('message', { 
    chatMessage: inputMessage.value,
    nickname,
  });
  inputMessage.value = '';
  return false;
});

const createMessage = (message) => {
  console.log(message);
  const messageUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerText = message;
  li.setAttribute('data-testid', 'message');
  messageUl.appendChild(li);
};

// altera nickname e lista usuário
const createUser = (user) => {
  nickname = user;
  socket.emit('usersOnCli');
};

const renderUsersOnline = (user) => {
  const li = document.createElement('li');
  li.innerText = user.nickname;
  console.log(li);
  li.setAttribute('data-testid', 'online-user');
  usersUl.appendChild(li);
};

const getUsersOnline = (users) => {
  usersUl.innerHTML = '';
  users.forEach((u) => renderUsersOnline(u));
};

// escuta msg do server
socket.on('message', (message) => createMessage(message));
socket.on('randomUser', (user) => createUser(user));
socket.on('usersOnServ', (users) => getUsersOnline(users));