const socket = window.io();

const messageform = document.querySelector('#message-form');
const inputMessage = document.querySelector('#message-box');
const userform = document.querySelector('#user-form');
const nicknameInput = document.querySelector('#nickname-box');
const usersBox = document.querySelector('#users');

const DATA_TEST_ID = 'data-testid';
let user;

const createUser = () => {
  const li = document.createElement('li');
  const randomNickname = socket.id.substring(0, 16);
  li.innerText = randomNickname;
  li.setAttribute(DATA_TEST_ID, 'online-user');
  li.setAttribute('id', randomNickname);
  user = randomNickname;
  usersBox.appendChild(li);
};

socket.on('newUser', () => createUser());

messageform.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('message', { chatMessage: inputMessage.value, nickname: user });
  inputMessage.value = '';
  return false;
});

const createMessage = (message) => {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerText = message;
  li.setAttribute(DATA_TEST_ID, 'message');
  messagesUl.appendChild(li);
};

socket.on('connection', (messages) => messages.forEach((message) => {
  socket.emit('history', {
    chatMessage: message.message, nickname: message.nickname, timestamp: message.timestamp });
  return false;
}));

socket.on('message', (message) => createMessage(message));

userform.addEventListener('submit', (e) => {
  e.preventDefault();
  const oldNick = document.querySelector(`#${user}`);
  oldNick.remove();
  const li = document.createElement('li');
  li.innerText = nicknameInput.value;
  li.setAttribute(DATA_TEST_ID, 'online-user');
  li.setAttribute('id', nicknameInput.value);
  user = nicknameInput.value;
  usersBox.appendChild(li);
  nicknameInput.value = '';
  return false;
});
