const socket = window.io();

const form = document.querySelector('form');
const inputMessage = document.querySelector('#messageInput');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    socket.emit('message', { chatMessage: inputMessage.value, nickname: socket.nickname });
    inputMessage.value = '';
    return false;
});

const sendMessage = (message) => {
    const chatMessages = document.querySelector('#chatMessages');
    const li = document.createElement('li');
    li.innerText = message;
    chatMessages.appendChild(li);
};

socket.on('message', (message) => sendMessage(message));