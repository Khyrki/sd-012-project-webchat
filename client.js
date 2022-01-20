const createMessage = (message) => {
  const messageList = document.querySelector('#message-list');
  const messageLi = document.createElement('li');

  messageLi.setAttribute('data-testid', 'message');
  messageLi.setAttribute('class', 'message');
  messageLi.innerText = message;

  messageList.appendChild(messageLi);
};

const createNickname = ({ username, id }) => {
  const nicknameList = document.querySelector('#nickname-list');
  const nicknameLi = document.createElement('li');

  nicknameLi.setAttribute('data-testid', 'online-user');
  nicknameLi.setAttribute('id', id);
  nicknameLi.setAttribute('class', 'user');
  nicknameLi.innerText = username;

  nicknameList.appendChild(nicknameLi);
};

const changeNickname = ({ newName, id }) => {
  const li = document.querySelector(`#${id}`);

  li.innerText = newName;
};

const removeNickname = (id) => {
  const li = document.querySelector(`#${id}`);

  li.remove();
};

const nicknameForm = document.querySelector('#nickname-form');
const nicknameInput = document.querySelector('#nickname-input');
const messageForm = document.querySelector('#message-form');
const messageInput = document.querySelector('#message-input');

const socket = window.io();

messageForm.addEventListener('submit', (event) => {
  const onlineUser = document.querySelector('.user');

  const chatMessage = messageInput.value;
  const nickname = onlineUser.innerText;

  event.preventDefault();

  socket.emit('message', { chatMessage, nickname });

  messageInput.value = '';
});

nicknameForm.addEventListener('submit', (event) => {
  const newName = nicknameInput.value;

  event.preventDefault();

  socket.emit('change-name', newName);

  nicknameInput.value = '';
});

socket.on('connect-user', ({ username, id }) => {
  createNickname({ username, id });
});

socket.on('history-users', (users) => {
  users.forEach(createNickname);
});

socket.on('message', (message) => {
  createMessage(message);
});

socket.on('change-name', ({ newName, id }) => {
  changeNickname({ newName, id });
});

socket.on('disconnect-user', (user) => {
  removeNickname(user);
});

window.onbeforeunload = () => {
  socket.disconnect();
};
