const socket = window.io();

const createMessage = () => {
  const nickName = document.querySelector('#nickName').innerText;
  const messagesDiv = document.querySelector('#messages');
  const messageInput = document.querySelector('#message-box');
  const newMessage = document.createElement('p');
  newMessage.innerText = `${nickName}: ${messageInput.value}`;
  messagesDiv.appendChild(newMessage);
  socket.emit('message', { chatMessage: messageInput.value, nickname: nickName.innerText });
  messageInput.value = '';
};

const messageButton = document.querySelector('#send-button');

messageButton.addEventListener('click', (e) => {
  e.preventDefault();
  createMessage();
});

socket.on('message', ({ chatMessage, nickname }) => {
  console.log('oioi');
  const messagesDiv = document.querySelector('#messages');
  const newMessage = document.createElement('p');
  newMessage.innerText = `${nickname}: ${chatMessage}`;
  messagesDiv.appendChild(newMessage);
});

window.onbeforeunload = () => {
  socket.disconnect();
};