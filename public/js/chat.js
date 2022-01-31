const socket = window.io();
const messageBox = document.querySelector('#message-box');
const sendButton = document.querySelector('#send-button');

socket.on('connect', () => {
 const userName = (socket.id).slice(0, 16);
 sessionStorage.setItem('user', JSON.stringify(userName));
 socket.emit('user', userName);
});

const newMessage = (data) => {
  const list = document.querySelector('#messages');
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'message');
  li.innerText = data;
  list.appendChild(li);
};

sendButton.addEventListener('click', (e) => {
  e.preventDefault();
  const user = JSON.parse(sessionStorage.getItem('user'));

  socket.emit('message', { chatMessage: messageBox.value, user });
  messageBox.value = '';
});

socket.on('message', (msg) => newMessage(msg));