const socket = window.io();

const inputForm = document.querySelector('#message-box');
const buttonForm = document.querySelector('#send-button');

const buttonNickName = document.querySelector('#nickname-button');
const inputNickName = document.querySelector('#nickname-box');

const nickLists = document.querySelector('#nicksList');
const ul = document.querySelector('#messages');

const createNickName = (nick) => nick.slice(0, 16);

const createMessage = (message) => {
  const li = document.createElement('li');
  li.innerText = message;
  li.setAttribute('data-testid', 'message');
  ul.appendChild(li);
};

const createUser = (user) => {
  const li = document.createElement('li');

  li.innerHTML = user;
  li.setAttribute('data-testid', 'online-user');

  nickLists.appendChild(li);
};

buttonForm.addEventListener('click', (e) => {
e.preventDefault();

const nickname = sessionStorage.getItem('nickname');

socket.emit('message', { chatMessage: inputForm.value, nickname });

inputForm.value = '';
});

buttonNickName.addEventListener('click', (e) => {
  e.preventDefault();
  
  const old = sessionStorage.getItem('nickname');
  const newNick = inputNickName.value;
  
  sessionStorage.setItem('nickname', newNick);
  
  socket.emit('updateNick', newNick, old);

  inputNickName.value = '';
  });

socket.on('connect', () => {
  const nick = createNickName(socket.id);
  sessionStorage.setItem('nickname', nick);
  socket.emit('user', nick);
});

socket.on('usersList', (nicks) => {
  nicks.forEach((nick) => createUser(nick));
});

socket.on('message', (msg) => createMessage(msg));
