const socket = window.io();

const formButton = document.getElementById('formButton');
const inputName = document.getElementById('inputName');
const inputMessage = document.getElementById('inputMessage');
const chat = document.getElementById('chat');
const btnRename = document.getElementById('btnRename');
const ulChat = document.getElementById('users');

let nicknameUser = '';

const getConnectedUser = (nick) => {
  nicknameUser = nick;
};

formButton.addEventListener('click', (e) => {
  e.preventDefault();
  socket.emit('message', { chatMessage: inputMessage.value, nickname: inputName.value });
  inputMessage.value = '';
  inputName.value = '';
});

btnRename.addEventListener('click', (e) => {
  e.preventDefault();
  nicknameUser = inputName.value;
  socket.emit('renameNickname', nicknameUser);
});

const onlineUsers = (arrUsers) => {
  ulChat.innerHTML = '';
  const liClient = document.createElement('li');
  liClient.setAttribute('data-testid', 'online-user');
  liClient.innerText = nicknameUser;
  ulChat.appendChild(liClient);

  arrUsers.forEach(({ nickname }) => {
    if (nickname === nicknameUser) return;

    const li = document.createElement('li');
    li.setAttribute('data-testid', 'online-user');
    li.innerText = nickname;
    ulChat.appendChild(li);
  });
};

const renderChat = (message) => {
  const li = document.createElement('li');
  li.dataset.testid = 'message';
  li.innerText = message;
  chat.appendChild(li);
};

const getAllMessages = (arrMessages) => {
  arrMessages.forEach(({ message, nickname, timestamp }) => {
    renderChat(`${timestamp} - ${nickname}: ${message}`);
  });
};

socket.on('message', (message) => renderChat(message));
socket.on('getMessages', (arrMessages) => getAllMessages(arrMessages));
socket.on('connectedUser', (nick) => getConnectedUser(nick));
socket.on('onlineUsers', (arrUsers) => onlineUsers(arrUsers));
