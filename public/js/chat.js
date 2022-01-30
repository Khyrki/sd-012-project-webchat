const socket = window.io();

const nickname = document.querySelector('.nickname');
const nicknameForm = document.querySelector('.nicknameForm');
const nicknameInput = document.querySelector('#nicknameInput');

const messageForm = document.querySelector('.messageForm');
const inputMessage = document.querySelector('#messageInput');

nicknameForm.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('entrou aqui');
  nickname.innerHTML = nicknameInput.value;
  nicknameInput.value = '';
});

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('message', { nickname: nickname.innerHTML, chatMessage: inputMessage.value });
  inputMessage.value = '';
});

const createMessage = (message) => {
  const messagesUl = document.querySelector('.messages');
  const li = document.createElement('li');
  li.dataset.testid = 'message';
  li.innerText = message;
  messagesUl.appendChild(li);
};

socket.on('message', (message) => createMessage(message));

window.onload = async () => {
  await socket.on('connect', () => { nickname.innerHTML = socket.id.slice(0, 16); });
};