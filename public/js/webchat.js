const socket = window.io();

const formButton = document.getElementById('formButton');
const inputName = document.querySelector('.inputName');
const inputMessage = document.querySelector('.inputMessage');
const chat = document.getElementById('chat');

formButton.addEventListener('click', (e) => {
  e.preventDefault();
  socket.emit('message', { chatMessage: inputMessage.value, nickname: inputName.value });
  inputMessage.value = '';
  inputName.value = '';
});

const renderChat = (message) => {
  chat.innerHTML = '';
  message.forEach((history) => {
    const li = document.createElement('li');
    li.innerText = history;
    chat.appendChild(li);
  });
};

socket.on('message', (history) => renderChat(history));
