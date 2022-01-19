const socket = window.io();

const sendButton = document.querySelector('#send-button');
const message = document.querySelector('#message');

const nicknameButton = document.querySelector('#nickname-button');
const nicknameBox = document.querySelector('#nickname-box');

const newUser = (name) => {
  const users = document.querySelector('#users');
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'online-user');
  li.innerText = name;
  users.appendChild(li);
};

const newMessage = (_newMessage) => {
  const messages = document.querySelector('#messages');
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'message');
  li.innerText = _newMessage;
  messages.appendChild(li);
};

nicknameButton.addEventListener('click', (e) => {
  e.preventDefault();
  socket.emit('changeNickname', nicknameBox.value);
});

sendButton.addEventListener('click', (e) => {
  e.preventDefault();
  socket.emit('message', { chatMessage: message.value });
});

socket.on('connection', (names) => names.forEach((nickname) => newUser(nickname)));

socket.on('message', (receivedMessage) => newMessage(receivedMessage));

window.onbeforeunload = () => {
  socket.disconnect();
};