const socket = window.io();

const nicknameForm = document.querySelector('#nickname-form');
const nicknameInput = document.querySelector('#nickname-input');
const messageForm = document.querySelector('#message-form');
const messageInput = document.querySelector('#message-input');
const usersUl = document.querySelector('#users');
let nicknameSupport = '';

nicknameForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const oldNickname = nicknameForm.previousElementSibling.innerText;
  const newNickname = nicknameInput.value;
  sessionStorage.setItem(oldNickname, newNickname);
  socket.emit('newNickname', { newNickname, oldNickname });
  nicknameSupport = newNickname;
  nicknameInput.value = '';
  return false;
});

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const chatMessage = messageInput.value;
  const nickname = nicknameSupport;
  const msgObj = { chatMessage, nickname };
  socket.emit('message', msgObj);
  messageInput.value = '';
  return false;
});

const printUser = ((user) => {
  const li = document.createElement('li');
  li.innerText = user;
  li.setAttribute('data-testid', 'online-user');
  li.setAttribute('id', user);
  usersUl.appendChild(li);
});

const printMessages = ((message) => {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerText = message;
  li.setAttribute('data-testid', 'message');
  messagesUl.appendChild(li);
});

socket.on('online', (id) => {
  nicknameSupport = id;
  sessionStorage.setItem(id, id);
  const h1 = document.querySelector('#h1');
  h1.innerText = id;
  return printUser(id);
});

socket.on('message', (message) => printMessages(message));

socket.on('listsUsers', (users) => {
  usersUl.innerHTML = '';
  printUser(nicknameSupport);
  users.forEach(({ user }) => {
    if (user !== nicknameSupport) return printUser(user);
  });
});