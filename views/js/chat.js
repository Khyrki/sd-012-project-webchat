const socket = window.io();
const chatUl = document.querySelector('#chatUl');
const formChat = document.querySelector('#formMessage');
const messageInput = document.querySelector('#messageInput');
const formNickname = document.querySelector('#nickname');
const ulNickname = document.querySelector('#ulNickname');
const nicknameInput = document.querySelector('#nicknameInput');

const tokenName = (length) => {
  const character = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i += 1) {
    result += character.charAt(Math.floor(Math.random() * character.length));
  }
  return result;
};

sessionStorage.setItem('nameToken', tokenName(16));

const displayName = document.createElement('li');
displayName.dataset.testid = 'online-user';
ulNickname.appendChild(displayName);
displayName.innerText = sessionStorage.getItem('nameToken');

formNickname.addEventListener('submit', (event) => {
  event.preventDefault();
  sessionStorage.setItem('nameToken', nicknameInput.value);
  displayName.innerText = nicknameInput.value;
  
  socket.emit('onlineUsers', nicknameInput.value);
  nicknameInput.value = '';
  return false;
});

const onlineUser = (users) => {
  console.log(users);
  users.forEach((user) => { 
  const nickname = document.createElement('li');
  nickname.dataset.testid = 'online-user';
  nickname.innerText = user;
  ulNickname.appendChild(nickname);
  });
};  

formChat.addEventListener('submit', (event) => {
  event.preventDefault();
  socket.emit('message', {
    nickname: displayName.textContent,
    chatMessage: messageInput.value,
  }); 
  messageInput.value = '';
  return false;
});

const createMessage = (message) => {
  const li = document.createElement('li');
  li.dataset.testid = 'message';
  li.innerText = message;
  chatUl.appendChild(li);
};

const welcome = (message) => {
  const p = document.createElement('p');
  p.innerText = message;
  formChat.appendChild(p);
};

socket.on('welcome', (message) => welcome(message));
socket.on('message', (message) => createMessage(message));
socket.on('onlineUsers', (users) => onlineUser(users));
