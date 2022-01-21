const socket = window.io();

const button = document.querySelector('#buttonSubmit');
const inputMessage = document.querySelector('#messageInput');
const lista = document.querySelector('#lista');
const buttonRename = document.querySelector('#sendRename');

let users = [...Array(16)]
.map((_i) => (Math.floor((Math.random() * 36))).toString(36)).join('');

const nick = document.querySelector('#nickName'); 
nick.innerHTML = users;

button.addEventListener('click', (e) => {
  e.preventDefault();
  socket.emit('message', { chatMessage: inputMessage.value, nickname: users });
  inputMessage.value = '';
  return false;
});

buttonRename.addEventListener('click', (e) => {
  e.preventDefault();
  const rename = document.querySelector('#inputRename');
  users = rename.value;
  nick.innerHTML = users;
});

socket.on('message', (message) => {
  const li = document.createElement('li');
  li.dataset.testid = 'message';
  li.innerHTML = message;
  lista.appendChild(li);
});