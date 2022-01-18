const socket = window.io();

window.onbeforeunload = (_event) => {
  socket.disconnect();
};

const nicknameForm = document.querySelector('#nicknameForm');
const nicknameInput = document.querySelector('#nicknameInput');
const messageForm = document.querySelector('#messageForm');
const messageInput = document.querySelector('#messageInput');

nicknameForm.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('nickname', nicknameInput.value);
  nicknameInput.value = '';
  return false;
});

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('message', messageInput.value);
  messageInput.value = '';
  return false;
});
