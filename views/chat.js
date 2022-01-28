const socket = window.io();

const aliasTeste = 'data-testid';

const nicknameInput = document.getElementById('nicknameInput');
const nicknameButton = document.getElementById('nicknameButton');
const msgInput = document.getElementById('msgInput');
const msgButton = document.getElementById('msgButton');

let userNick = '';

msgButton.addEventListener('click', (event) => {
    event.preventDefault();
    const nickname = userNick || socket.id.slice(0, 16);
    socket.emit('message', { chatMessage: msgInput.value, nickname });
    msgInput.value = '';
});

const msgUser = (message) => {
    const messge = document.getElementById('userMsgs');
    const li = document.createElement('li');
    li.innerText = message;
    li.setAttribute(aliasTeste, 'message');
    messge.appendChild(li);
};

nicknameButton.addEventListener('click', (event) => {
    event.preventDefault();
    userNick = nicknameInput.value;
    if (userNick !== '') {
        socket.emit('newUser', userNick);
        nicknameInput.value = '';
    }
});

const nameList = (onUser) => {
    const user = document.getElementById('conUsers');
    user.innerHTML = '';
    onUser.forEach((element) => {
        const li = document.createElement('li');
        li.setAttribute(aliasTeste, 'online-user');
        li.innerText = element;
        user.appendChild(li);
    });
};

socket.on('message', (chatMessage) => msgUser(chatMessage));

socket.on('names', (onUser) => nameList(onUser)); 