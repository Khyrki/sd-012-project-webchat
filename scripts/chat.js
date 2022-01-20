const socket = window.io();

const form = document.querySelector('form');
const btnNick = document.querySelector('#btnNick');
const input = document.querySelector('#inputMessage');
let nickname = '';

btnNick.addEventListener('click', () => {
  const inputNick = document.querySelector('#inputNick');
  nickname = inputNick.value;
  console.log('NickConsole', nickname);
  return false;
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const chatMessage = input.value;
  const msg = { nickname, chatMessage };
  socket.emit('message', msg);
  input.value = '';
  return false;
});

const createMessage = (msg) => {
  const messageUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'message');
  li.innerText = msg;
  messageUl.appendChild(li);
};

const createNickname = (id) => {
  const trueId = id.slice(0, 16);
  const userUl = document.querySelector('#userList');
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'online-user');
  li.innerText = trueId;
  userUl.appendChild(li);
};

socket.on('init', (id) => createNickname(id));
socket.on('message', (msg) => createMessage(msg));