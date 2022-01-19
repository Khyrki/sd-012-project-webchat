const socket = window.io();

const form = document.querySelector('form');
const btnNick = document.querySelector('#btnNick');
const input = document.querySelector('#inputMessage');
let nickname = '';

btnNick.addEventListener('click', (e) => {
  e.preventDefault();
  const inputNick = document.querySelector('#inputNick');
  console.log('assssss');
  nickname = inputNick.value;
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
  li.innerText = msg;
  messageUl.appendChild(li);
};

socket.on('message', (msg) => createMessage(msg));