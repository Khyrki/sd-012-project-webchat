const socket = window.io();

const nicknameForm = document.querySelector('#nickname-form');
const nicknameInput = document.querySelector('#nickname-input');
const messageForm = document.querySelector('#message-form');
const messageInput = document.querySelector('#message-input');

nicknameForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const newNickname = nicknameInput.value;
  sessionStorage.setItem(newNickname, newNickname);
  socket.emit('newNickname', newNickname);
  nicknameInput.value = '';
  return false;
});

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const userLi = document.querySelector('#users').lastChild;
  const chatMessage = messageInput.value;
  const nickname = sessionStorage.getItem(userLi.innerText);
  const msgObj = { chatMessage, nickname };
  socket.emit('message', msgObj);
  messageInput.value = '';
  return false;
});

const printUser = ((user) => {
  const usersUl = document.querySelector('#users');
  const li = document.createElement('li');
  li.innerText = user;
  li.setAttribute('data-testid', 'online-user');
  usersUl.appendChild(li);
});

const printMessages = ((message) => {
  const usersUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerText = message;
  li.setAttribute('data-testid', 'message');
  usersUl.appendChild(li);
});

const changesNickname = ((newNickname) => {
  const userLi = document.querySelector('#users').lastElementChild;
  userLi.innerHTML = newNickname;
});

function makeId(n) { // stack over flowzada
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < n; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
 }
 return result;
}

socket.on('online', () => {
  const id = makeId(16);
  sessionStorage.setItem(id, id);
  return printUser(id);
});

socket.on('message', (message) => printMessages(message));

socket.on('new', (newNickname) => changesNickname(newNickname));