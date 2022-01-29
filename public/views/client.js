const socket = window.io();

const form = document.querySelector('.form');
const inputMessage = document.querySelector('.message-input');
const nameUser = document.querySelector('.nickname-input');
const messagesUl = document.querySelector('.messages');
const ulUsers = document.querySelector('.users');
const buttonNickname = document.querySelector('.nickname-btn');

let tokenUser = '';

form.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('message', { chatMessage: inputMessage.value, nickname: nameUser.value });
  inputMessage.value = '';
  nameUser.value = '';
});

const createMessage = (message) => {
  const li = document.createElement('li');
  li.dataset.testid = 'message';
  li.innerText = message;
  messagesUl.appendChild(li);
};

const createToken = (token) => {
  tokenUser = token;
};

const getAll = (data) => {
  data.forEach(({ nickname, message, timestamp }) => {
    createMessage(`${timestamp} - ${nickname}: ${message}`);
  });
};

const newUser = (data) => {
  ulUsers.innerHTML = '';
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'online-user');
  li.innerText = tokenUser;
  ulUsers.appendChild(li);

  data.forEach((users) => {
    if (tokenUser === users.nickname) return;
    const othersUsers = document.createElement('li');
    othersUsers.setAttribute('data-testid', 'online-user');
    othersUsers.innerText = users.nickname;
    ulUsers.appendChild(othersUsers);
  });
};

buttonNickname.addEventListener('click', (event) => {
  event.preventDefault();
  tokenUser = nameUser.value;
  socket.emit('newNickname', tokenUser);
});

socket.on('message', (message) => createMessage(message));
socket.on('token', (token) => createToken(token));
socket.on('allData', (data) => getAll(data));
socket.on('newUser', (data) => newUser(data));
