const socket = window.io();

const form = document.querySelector('#form-chat');
const inputMessage = document.querySelector('#messageInput');

form.addEventListener('submit', (e) => {  
  const nickname = socket.id;
  e.preventDefault();
  socket.emit('message', ({ chatMessage: inputMessage.value, nickname }));
  inputMessage.value = '';
  return false;  
});

const createMessage = (message) => {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerText = message;
  messagesUl.appendChild(li);
};

socket.on('message', (message) => {   
  createMessage(message); 
});