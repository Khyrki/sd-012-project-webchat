const socket = window.io();

const form = document.querySelector('form');
const formNick = document.querySelector('#formNick');
const inputMessage = document.querySelector('#messageInput');
const currentUser = document.querySelector('#currentUser');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('message', { chatMessage: inputMessage.value, nickname: currentUser.innerText });
  inputMessage.value = '';
  return false;
});

formNick.addEventListener('submit', (e) => {
  e.preventDefault();
  const fieldNick = document.querySelector('#nickName');
  currentUser.innerText = fieldNick.value;
  fieldNick.value = '';
  return false;
});

const createMessage = (message) => {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerText = message;
  if (message !== 'Olá, seja bem vindo ao nosso chat público!') {
    li.dataset.testid = 'message';
  }
  messagesUl.appendChild(li);
};

const createInitialNick = (nick) => {
  currentUser.innerText = nick;
};

socket.on('hello', ({ _msg, initialNick }) => {
  // createMessage(msg);
  createInitialNick(initialNick);
});
socket.on('message', (message) => createMessage(message));
