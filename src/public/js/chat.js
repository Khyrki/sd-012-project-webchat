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

const randomUser = (user) => {
  nickname = user;
  const li = document.createElement('li');
  li.innerText = user;
  console.log(li);
  li.setAttribute('data-testid', 'online-user');
  usersUl.appendChild(li);
};

// escuta msg do server
socket.on('message', (message) => createMessage(message));
socket.on('randomUser', (user) => randomUser(user));