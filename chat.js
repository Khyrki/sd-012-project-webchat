const socket = window.io();

const userForm = document.querySelector('#userForm');
const msgForm = document.querySelector('#messageForm');
const inputMsgPlace = document.querySelector('#messageInput');
const inputNickname = document.querySelector('#nickname');

let userNickname = '';

msgForm.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('message', {
    nickname: userNickname,
    chatMessage: inputMsgPlace.value,
  });
  inputMsgPlace.value = '';
  return false;
});

const createMessage = (message) => {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerText = message;
  messagesUl.appendChild(li);
};

userForm.addEventListener('submit', (e) => {
  e.preventDefault();
  userNickname = inputNickname.value;
  socket.emit('newNickname', userNickname);
  inputNickname.value = '';
  return false;
});

const createUser = (nickname) => {
  const nicksUl = document.querySelector('#users');
  const li = document.createElement('li');
  li.innerText = nickname;
  nicksUl.appendChild(li);
};

socket.on('serverMessage', (message) => createMessage(message));
socket.on('serverNick', (nickname) => createUser(nickname));
socket.on('hello', (mensagem) => createMessage(mensagem));

window.onbeforeunload = () => {
  socket.disconnect();
};