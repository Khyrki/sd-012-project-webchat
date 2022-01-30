const socket = window.io();

const formMsg = document.querySelector('.form-msg');
const inputMessage = document.querySelector('.messageInput');
const nickText = document.querySelector('.name');
const msg = document.querySelector('.messageInput');
const nickname = document.querySelector('.nickname-box');
const nicknameBtn = document.querySelector('#nickname-button');

nicknameBtn.addEventListener('click', (e) => {
  e.preventDefault();
  nickText.innerHTML = nickname.value;
  nickname.value = '';
});

socket.on('nickname', (name) => {
  nickText.innerText = name;
  nickText.setAttribute('data-testid', 'online-user');
});

formMsg.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('message', { chatMessage: msg.value, nickname: nickText.innerText });
  inputMessage.value = '';
  console.log(inputMessage);
  return false;
});

const createMessage = (message) => {
  const messagesUl = document.querySelector('.messages');
  const li = document.createElement('li');
  li.innerText = message;
  li.setAttribute('data-testid', 'message');
  messagesUl.appendChild(li);
};

socket.on('message', (chatMessage) => createMessage(chatMessage));