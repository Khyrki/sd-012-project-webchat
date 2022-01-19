const socket = window.io();
const messagesForm = document.querySelector('#send-message');
const nicknameForm = document.querySelector('#send-nickname');
const inputMessage = document.querySelector('#messageInput');
const inputNickname = document.querySelector('#nicknameInput');

nicknameForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const sentNickname = inputNickname.value;
    sessionStorage.setItem('nickname', sentNickname);
    socket.emit('changeNickname', sentNickname);
    inputNickname.value = '';
    return false;
});

messagesForm.addEventListener('submit', (e) => {    
    e.preventDefault();
    const chatMessage = inputMessage.value;
    const nickname = sessionStorage.getItem('nickname');
    socket.emit('message', ({ chatMessage, nickname }));
    inputMessage.value = '';
    return false;
});

const createMessage = (message) => {
    const messagesUl = document.querySelector('#messages');
    const li = document.createElement('li');
    li.innerHTML = message;
    li.setAttribute('data-testid', 'message');
    messagesUl.appendChild(li);
};

const createNickname = (nickname, id) => {
    const nicknamesUl = document.querySelector('#nicknames');
    const li = document.createElement('li');
    li.innerHTML = nickname;
    li.setAttribute('id', id);
    li.setAttribute('data-testid', 'online-user');
    nicknamesUl.appendChild(li);
};

const changeNickname = (nickname, id) => {
    const editNickname = document.querySelector(`#${id}`);
    editNickname.innerHTML = nickname;
};

socket.on('message', (message) => createMessage(message));
socket.on('connection', ({ nickname, id }) => {
    sessionStorage.setItem('nickname', nickname);
    createNickname(nickname, id);
});
socket.on('changeNickname', ({ nickname, id }) => changeNickname(nickname, id));