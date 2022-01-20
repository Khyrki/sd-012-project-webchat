const socket = window.io();
const messageForm = document.getElementById('message-form');
const messageBox = document.getElementById('message-box');
const nicknameForm = document.getElementById('nickname-form');
const nicknameBox = document.getElementById('nickname-box');
const currentUser = document.getElementById('current-user');

let nickname = '';

socket.on('connect', () => {
    nickname = socket.id.substring(0, 16);
    currentUser.innerText = nickname;
    socket.emit('newUser', { id: socket.id, nickname });
});

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    socket.emit('message', { nickname, chatMessage: messageBox.value });
    messageBox.value = '';
    return false;
});

nicknameForm.addEventListener('submit', (e) => {
    e.preventDefault();
    nickname = nicknameBox.value;
    socket.emit('changeNick', { nickname });
    currentUser.innerText = nickname;
    nicknameBox.value = '';
    return false;
});

socket.on('message', (message) => {
    const li = document.createElement('li');
    li.innerText = message;
    li.setAttribute('data-testid', 'message');
    document.getElementById('messages-ul').appendChild(li);
});

socket.on('onlineUsers', (onlineUsers) => {
    document.getElementById('users-ul').innerHTML = '';
    const filteredUsers = onlineUsers.filter((user) => user.nickname !== nickname);
    filteredUsers.forEach((user) => {
        const li = document.createElement('li');
        li.innerText = user.nickname;
        li.setAttribute('data-testid', 'online-user');
        document.getElementById('users-ul').appendChild(li);
    });
});