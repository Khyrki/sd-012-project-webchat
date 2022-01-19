const socket = window.io();
const form = document.querySelector('#send-message');
const inputMessage = document.querySelector('#messageInput');

form.addEventListener('submit', (e) => {    
    e.preventDefault();
    const chatMessage = inputMessage.value;
    socket.emit('message', ({ chatMessage, nickname: socket.nickname }));
    inputMessage.value = '';
    return false;
});

const createMessage = (message) => {
    const messagesUl = document.querySelector('#messages');
    const li = document.createElement('li');
    li.innerText = message;
    li.setAttribute('data-testid', 'message');
    messagesUl.appendChild(li);
};

socket.on('message', (message) => createMessage(message));  