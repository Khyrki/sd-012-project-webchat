const socket = window.io();

const messageForm = document.querySelector('#messageForm');
const inputMessage = document.querySelector('#messageInput');
const nicknameForm = document.querySelector('#nicknameForm');
const inputNickname = document.querySelector('#nicknameInput');

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nickname = sessionStorage.getItem('nickname');
    socket.emit('message', { chatMessage: inputMessage.value, nickname });
    inputMessage.value = '';
    return false;
});

nicknameForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newNickname = inputNickname.value;
    sessionStorage.setItem('nickname', newNickname);
    inputNickname.value = '';
    socket.emit('changeNickname', newNickname);
    return false;
});

const sendMessage = (message) => {
    const chatMessages = document.querySelector('#chatMessages');
    console.log(chatMessages);
    const li = document.createElement('li');
    li.setAttribute('data-testid', 'message');
    li.innerText = message;
    chatMessages.appendChild(li);
};

socket.on('message', (message) => sendMessage(message));

socket.on('newConnection', ({ nickname, id }) => {
    sessionStorage.setItem('nickname', nickname);
    const nicknameContainer = document.querySelector('#nicknamesContainer');
    const li = document.createElement('li');
    li.setAttribute('data-testid', 'online-user');
    li.setAttribute('id', id);
    li.innerText = nickname;
    nicknameContainer.appendChild(li);
});

socket.on('changeNickname', ({ newNickname, id }) => {
    const currentNickname = document.querySelector(`#${id}`);
    currentNickname.innerHTML = newNickname;
});