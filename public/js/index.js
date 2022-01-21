const socket = window.io();
const sendMessageForm = document.querySelector('.send-message-form');
const changeNicknameForm = document.querySelector('.change-nickname-form');
const inputMessage = document.querySelector('#message-box');
const inputNickname = document.querySelector('#nickname-box');
const nicknameLabel = document.querySelector('#online-user');

let nickname;

const generateNickname = () => {
  let generatedNickname = Math.random().toString(36).substring(2, 10);
  generatedNickname = `${generatedNickname}${Math.random().toString(36).substring(2, 10)}`;
  return generatedNickname;
};

const verifyAlreadyLogged = () => {
  let storedNickname = sessionStorage.getItem('nickname');
  if (!storedNickname) {
    storedNickname = generateNickname();
    sessionStorage.setItem('nickname', storedNickname);
  }
  nicknameLabel.innerText = storedNickname;
  nickname = storedNickname;
};

verifyAlreadyLogged();

sendMessageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const chatMessage = inputMessage.value;
  socket.emit('message', { nickname, chatMessage });
  inputMessage.value = '';
  return false;
});

changeNicknameForm.addEventListener('submit', (e) => {
  e.preventDefault();
  nickname = inputNickname.value;
  nicknameLabel.innerText = nickname;
  sessionStorage.setItem('nickname', nickname);
  inputNickname.value = '';
  return false;
});

const createMessage = (message) => {
  const messagesUl = document.querySelector('.messages');
  const li = document.createElement('li');
  li.innerText = message;
  li.setAttribute('data-testid', 'message');
  messagesUl.appendChild(li);
};

socket.on('message', (message) => createMessage(message));

window.onbeforeunload = function e(_event) {
  socket.disconnect();
};
