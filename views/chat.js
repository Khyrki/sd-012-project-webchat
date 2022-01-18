const socket = window.io();

const formMessage = document.querySelector('.formMessage');
const inputMessage = document.querySelector('.message-box');

formMessage.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('message', { chatMessage: inputMessage.value });
  inputMessage.value = '';
});

function messageCreation(message) {
  const messageUl = document.querySelector('.messages');
  const messageLi = document.createElement('li');
  messageLi.classList.add('message');
  messageLi.innerText = message;

  messageUl.appendChild(messageLi);
}

socket.on('message', (message) => messageCreation(message));

window.onbeforeunload = (_e) => socket.disconnect();
