const socket = window.io();

const messageForm = document.querySelector('#messageForm');
const inputMessage = document.querySelector('#messageInput');

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const id16Characters = socket.id.slice(0, 16);

  socket.emit('message', {
    chatMessage: inputMessage.value,
    nickname: id16Characters,
  });
  
  inputMessage.value = '';
  return false;
});

const createMessage = (chatMessage) => {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'message');
  li.innerText = chatMessage;
  messagesUl.appendChild(li);
};

socket.on('message', (chatMessage) => createMessage(chatMessage));

window.onbeforeunload = (_e) => socket.disconnect();