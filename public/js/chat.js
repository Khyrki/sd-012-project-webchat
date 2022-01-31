const socket = window.io();

const messages = document.querySelector('#messages');
const usersList = document.querySelector('#nicksList');
const btnMessage = document.querySelector('#send-button');
const messageBox = document.querySelector('#message-box');
const nickNameChange = document.querySelector('#nickname-box');
const sendNickname = document.querySelector('#nickname-button');

const testId = 'data-testid';

const createMensage = (value) => {
  const li = document.createElement('li');
  li.setAttribute(testId, 'message');
  li.innerHTML = value;
  messages.appendChild(li);
};

const generateUserName = (value) => value.slice(4);

btnMessage.addEventListener('click', (e) => {
  e.preventDefault();
  const nickname = sessionStorage.getItem('nickname');
  if (messageBox.value) {
    socket.emit('message', { chatMessage: messageBox.value, nickname });
  }
  messageBox.value = '';
});

socket.on('connect', () => {
  const nickName = generateUserName(socket.id);
  sessionStorage.setItem('nickname', nickName);
  socket.emit('newUser', nickName);
});

sendNickname.addEventListener('click', (e) => {
  e.preventDefault();
  const oldUser = sessionStorage.getItem('nickname');
  const newUser = nickNameChange.value;
  sessionStorage.setItem('nickname', newUser);
  if (newUser) {
    socket.emit('attUserName', newUser, oldUser);
  }
  nickNameChange.value = '';
});

const createUser = (value) => {
  const li = document.createElement('li');
  li.innerHTML = value;
  li.setAttribute(testId, 'online-user');
  usersList.appendChild(li);
};

const clearUsers = () => {
  while (usersList.firstChild) {
    usersList.removeChild(usersList.lastChild);
  }
};

/* https://stackoverflow.com/questions/5306680/move-an-array-element-from-one-array-position-to-another  */

function arrUsersMove(arr, from, to) {
  arr.splice(to, 0, arr.splice(from, 1)[0]);
  return arr;
}

socket.on('updateAllUsers', (users) => {
  clearUsers();
  const nickname = sessionStorage.getItem('nickname');
  const index = users.findIndex((nick) => nick === nickname);
  const newIndex = arrUsersMove(users, index, 0);
  newIndex.forEach((nick) => createUser(nick));
});

socket.on('message', (msg) => createMensage(msg));

window.onbeforeunload = () => {
  clearUsers();
  const nickname = sessionStorage.getItem('nickname');
  socket.emit('disconnect', nickname);
  socket.disconnect();
};