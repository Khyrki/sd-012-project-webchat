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

const createNewMessage = (msg) => {
  const webchatMessages = document.querySelector('.webchat-messages');
  const displayedMessage = document.createElement('p');
  displayedMessage.setAttribute('data-testid', 'message');

  if (typeof msg === 'object') {
    const { message, nickname, date } = msg;
    displayedMessage.innerText = `${date} - ${nickname}: ${message}`;
  } else {
    displayedMessage.innerText = msg;
  }

  webchatMessages.appendChild(displayedMessage);
};

const createNewUser = (nickname) => {
  sessionStorage.setItem('user', nickname);

  const userList = document.querySelector('.user-list');
  const user = document.createElement('li');
  user.className = 'user';
  user.setAttribute('data-testid', 'online-user');
  user.innerText = nickname;
  userList.appendChild(user);
};

window.addEventListener('load', () => {
  socket.emit('nickname');
});

const connectMessages = (msgs) => {
  msgs.forEach((msg) => {
    const { message, nickname, date } = msg;
    createNewMessage({ message, nickname, date });
  });
};

socket.on('message', (message) => createNewMessage(message));
socket.on('serverNickname', (nickname) => createNewUser(nickname));
socket.on('loadMessages', (message) => connectMessages(message));