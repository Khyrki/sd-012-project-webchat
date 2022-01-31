const socket = window.io();

const sendButton = document.querySelector('#sendButton');
const inputMessage = document.querySelector('#messageInput');
const newNickNameInput = document.querySelector('#nicknameInput');
const setNewNickButton = document.querySelector('#nickButton');
const listUl = document.querySelector('#listOnlineUsers');
const dataTestId = 'data-testid';
let nickname = '';

setNewNickButton.addEventListener('click', () => {
  nickname = newNickNameInput.value;
  socket.emit('newNickName', nickname);
  newNickNameInput.value = '';
});

sendButton.addEventListener('click', (e) => {
  e.preventDefault();
  socket.emit('message', ({ chatMessage: inputMessage.value, nickname }));
  inputMessage.value = '';
});

const createMessage = (message) => {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerText = message;
  li.setAttribute(dataTestId, 'message');
  messagesUl.appendChild(li);
};

socket.on('message', (message) => createMessage(message));
socket.on('listUsers', (users) => {
  listUl.innerHTML = '';
  const myLi = document.createElement('li');
  myLi.setAttribute(dataTestId, 'online-user');
  myLi.innerText = nickname || socket.id.slice(0, 16);
  listUl.appendChild(myLi);
  users.forEach((user) => {
    console.log(user.nickname);
    console.log(nickname);
    if (user.nickname !== (nickname || socket.id.slice(0, 16))) {
      const li = document.createElement('li');
      li.setAttribute(dataTestId, 'online-user');
      li.innerText = user.nickname;
      listUl.appendChild(li);
    }
  });
});

window.onbeforeunload = () => {
  socket.disconnect();
};
