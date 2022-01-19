const socket = window.io();
const inputNickname = document.querySelector('#nicknameInput');
const formMessages = document.querySelector('#message-form');
const inputMessage = document.querySelector('#messageInput');

// envia msg p servidor
formMessages.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log(inputMessage.value);
  socket.emit('message', { 
    chatMessage: inputMessage.value,
    nickname: inputNickname.value,
  });
  inputMessage.value = '';
  return false;
});

const createMessage = (message) => {
  console.log(message);
  const messageUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerText = message;
  messageUl.appendChild(li);
};

// escuta msg do server
socket.on('message', (message) => createMessage(message));