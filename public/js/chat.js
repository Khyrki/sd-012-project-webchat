const socket = window.io();

const sendButton = document.querySelector('#send-button');
const message = document.querySelector('#message');

const nicknameButton = document.querySelector('#nickname-button');
const nicknameBox = document.querySelector('#nickname-box');

const newUser = (name) => {
  const users = document.querySelector('#users');
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'online-user');
  li.setAttribute('id', 'online-user');
  li.innerText = name;
  users.appendChild(li);
};

const clearUsers = () => {
  const users = document.querySelector('#users');
  users.innerHTML = '';
};

const sendNewMessage = (newMessage) => {
  const messages = document.querySelector('#messages');
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'message');
  li.innerText = newMessage;
  messages.appendChild(li);
};

nicknameButton.addEventListener('click', (e) => {
  e.preventDefault();
  socket.emit('changeNickname', nicknameBox.value);
  nicknameBox.value = '';
});

sendButton.addEventListener('click', (e) => {
  e.preventDefault();
  socket.emit('message', { chatMessage: message.value });
  message.value = '';
});

socket.on('connection', (messages) => messages.forEach((_message) => sendNewMessage(_message)));

socket.on('userConnection', (nicknames) => {
  clearUsers();
  nicknames.forEach((nickname) => newUser(nickname));
});

socket.on('message', (receivedMessage) => sendNewMessage(receivedMessage));

socket.on('historyMessages', (receivedMessage) => sendNewMessage(receivedMessage));

window.onbeforeunload = () => {
  socket.disconnect();
};