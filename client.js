const createMessage = (message) => {
  const messageList = document.querySelector('#message-list');
  const messageLi = document.createElement('li');

  messageLi.setAttribute('data-testid', 'message');
  messageLi.setAttribute('class', 'message');
  messageLi.innerText = message;

  messageList.appendChild(messageLi);
};

const createNickname = (nickname) => {
  const nicknameList = document.querySelector('#nickname-list');
  const nicknameLi = document.createElement('li');

  nicknameLi.setAttribute('data-testid', 'online-user');
  nicknameLi.setAttribute('id', 'online-user');
  nicknameLi.setAttribute('class', 'user');
  nicknameLi.innerText = nickname;

  nicknameList.appendChild(nicknameLi);
};

const changeNickname = ({ newName, currentName }) => {
  const usersLi = document.querySelectorAll('.user');
  const nicknameLi = [...usersLi].find((li) => li.innerText === currentName);

  nicknameLi.innerText = newName;
};

const nicknameForm = document.querySelector('#nickname-form');
const nicknameInput = document.querySelector('#nickname-input');
const messageForm = document.querySelector('#message-form');
const messageInput = document.querySelector('#message-input');

const socket = window.io();

messageForm.addEventListener('submit', (event) => {
  const onlineUser = document.querySelector('#online-user');

  const chatMessage = messageInput.value;
  const nickname = onlineUser.innerText;

  event.preventDefault();

  socket.emit('message', { chatMessage, nickname });

  messageInput.value = '';
});

nicknameForm.addEventListener('submit', (event) => {
  const onlineUser = document.querySelector('#online-user');

  const newName = nicknameInput.value;
  const currentName = onlineUser.innerText;

  event.preventDefault();

  socket.emit('change-name', { newName, currentName });

  nicknameInput.value = '';
});

socket.on('connect-user', (nickname) => {
  createNickname(nickname);
});

socket.on('message', (message) => {
  createMessage(message);
});

socket.on('change-name', ({ newName, currentName }) => {
  changeNickname({ newName, currentName });
});
