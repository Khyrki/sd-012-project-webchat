const socket = window.io();

const nicknameDisplayer = document.getElementById('userNickname');
const nicknameInput = document.getElementById('nicknameInput');
const messageBox = document.getElementById('messageBox');
// const sendButton = document.getElementById('sendButton');
const messageForm = document.getElementById('messageForm');
const nicknameForm = document.getElementById('nicknameForm');

const setNickname = (nickname) => {
  nicknameDisplayer.innerText = nickname;
};

nicknameForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const key = nicknameDisplayer.innerText;
  const userNickname = nicknameInput.value;
  sessionStorage.setItem(key, userNickname);
  setNickname(sessionStorage.getItem(key));
  nicknameInput.value = '';
});

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const chatMessage = messageBox.value;
  const nickname = nicknameDisplayer.innerText;
  socket.emit('message', { chatMessage, nickname });
  messageBox.value = '';
  return false;
});

socket.on('newConnection', (socketId) => {
  const sixteenCarachNick = socketId.substring(0, 16);

  if (sessionStorage.getItem(sixteenCarachNick)) {
    return setNickname(sessionStorage.getItem(sixteenCarachNick));
  }

  sessionStorage.setItem(sixteenCarachNick, sixteenCarachNick);

  setNickname(sixteenCarachNick);
});

socket.on('message', (message) => {
  const messagesUl = document.getElementById('messages');
  const li = document.createElement('li');
  li.innerText = message;
  li.setAttribute('data-testid', 'message');
  messagesUl.appendChild(li);
});