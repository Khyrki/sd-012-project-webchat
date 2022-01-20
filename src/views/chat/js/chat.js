const socket = window.io();

const userBox = document.querySelector('.nickBox');
const userNick = document.querySelector('.nickInput');
const messageBox = document.querySelector('.messageBox');
const inputMessage = document.querySelector('.messageInput');

messageBox.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('clientMessage', inputMessage.value);
  inputMessage.value = '';
  return false;
});

userBox.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('clientUser', userNick.value);
  userNick.value = '';
  return false;
});

const createMessage = (message) => {
  const messagesUl = document.querySelector('.messages');
  const li = document.createElement('li');
  li.innerText = message;
  messagesUl.appendChild(li);
};

const createUser = (nickname) => {
  const messagesUl = document.querySelector('.users');
  const li = document.createElement('li');
  li.innerText = nickname;
  messagesUl.appendChild(li);
};

socket.on('serverMessage', (message) => createMessage(message));
socket.on('createUser', (nickname) => createUser(nickname));

window.onbeforeunload = (_event) => {
  socket.disconnect();
};