const socket = window.io();

const messageInput = document.getElementById('message-box');
const sendButton = document.getElementById('send-button');

const nicknameInput = document.getElementById('nickname-box');
const nicknameButton = document.getElementById('nickname-button');

const User = document.getElementById('online-user');

const randomNickname = Array.from(Array(16), 
() => Math.floor(Math.random() * 36).toString(36)).join('');

User.innerHTML = sessionStorage.getItem('nickname') || randomNickname;

sendButton.addEventListener('click', () => {
  socket.emit('message', { chatMessage: messageInput.value, nickname: User.innerHTML });
  messageInput.value = '';
});

nicknameButton.addEventListener('click', () => {
  const newNickname = nicknameInput.value;
  nicknameInput.value = '';
  User.innerHTML = newNickname;
  sessionStorage.setItem('nickname', newNickname);
});

const messagesList = document.querySelector('.messages');

function messageCreation(message) {
  const messageLi = document.createElement('li');
  messageLi.classList.add('message');
  messageLi.setAttribute('data-testid', 'message');
  messageLi.innerText = message;

  messagesList.appendChild(messageLi);
}

socket.on('message', (message) => messageCreation(message)); 