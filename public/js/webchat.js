const socket = window.io();

const webchatForm = document.querySelector('.webchat-form');
const webchatLoginForm = document.querySelector('.webchat-login');
const inputMessage = document.querySelector('.input-message');
const inputNickname = document.querySelector('.input-nickname');

const submitMessage = (event) => {
  event.preventDefault();
  const nickname = sessionStorage.getItem('user');

  socket.emit('message', {
    chatMessage: inputMessage.value,
    nickname,
  });

  inputMessage.value = '';

  return false;
};

const submitNickname = (event) => {
  event.preventDefault();
  sessionStorage.setItem('user', inputNickname.value);

  socket.emit('nickname', inputNickname.value);
  inputNickname.value = '';
  return false;
};

webchatForm.addEventListener('submit', (event) => submitMessage(event));
webchatLoginForm.addEventListener('submit', (event) => submitNickname(event));

const createNewMessage = (message) => {
  const webchatMessages = document.querySelector('.webchat-messages');
  const displayedMessage = document.createElement('p');
  displayedMessage.setAttribute('data-testid', 'message');
  displayedMessage.innerText = message;

  webchatMessages.appendChild(displayedMessage);
};

const createNewUser = (nickname) => {
  const userList = document.querySelector('.user-list');
  const user = document.createElement('li');
  user.className = 'user';
  user.setAttribute('data-testid', 'online-user');
  user.innerText = nickname;
  userList.appendChild(user);
};

socket.on('message', (message) => createNewMessage(message));
socket.on('serverNickname', (nickname) => createNewUser(nickname));