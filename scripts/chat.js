const socket = window.io();

const form = document.querySelector('form');
const btnNick = document.querySelector('#btnNick');
const input = document.querySelector('#inputMessage');
const userUl = document.querySelector('#userList');

let nickname = '';

btnNick.addEventListener('click', () => {
  const inputNick = document.querySelector('#inputNick');
  nickname = inputNick.value;
  socket.emit('updateNickname', { nickname, id: socket.id });
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

const createNickname = (nick) => {
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'online-user');
  li.innerText = nick;
  userUl.appendChild(li);
};

const updateUserList = (listUser) => {
  userUl.innerHTML = '';
  if (nickname) createNickname(nickname);
  listUser.forEach((e) => {
  if (e.nick !== nickname) createNickname(e.nick);
  });
};

socket.on('init', (nick) => { nickname = nick; });
socket.on('message', (msg) => createMessage(msg));
socket.on('listUser', (userList) => updateUserList(userList));