const socket = window.io();

const form = document.querySelector('.form');
const inputMessage = document.querySelector('.message-input');
// const ul = document.querySelector('#users');
const messagesUl = document.querySelector('.messages');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('Entrou no forms');
  socket.emit('message', { chatMessage: inputMessage.value, nickname: 'Bruno' });
  inputMessage.value = '';
});

const createMessage = (message) => {
  const li = document.createElement('li');
  li.innerText = message;
  li.setAttribute('data_testid', 'message');
  messagesUl.appendChild(li);
};

socket.on('message', (message) => createMessage(message));
