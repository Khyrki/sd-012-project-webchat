const socket = window.io();

const ONLINE_USER = 'online-user';

let nickname = '';

const addToStageNewLi = (text, testId, fatherId, id) => {
  const listElement = document.getElementById(fatherId);

  const li = document.createElement('li');
  const liText = document.createTextNode(text);

  if (id) { li.setAttribute('id', id); }

  li.setAttribute('data-testid', testId);

  li.append(liText);

  if (id === socket.id) { return listElement.prepend(li); }

  listElement.append(li);
};

const formSendMessage = document.querySelector('.form-send-message');
formSendMessage.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const messageInput = event.target.firstElementChild;
  const chatMessage = messageInput.value;

  socket.emit('message', { chatMessage, nickname });

  messageInput.value = '';
});

const formChangeNickname = document.querySelector('.form-change-nickname');
formChangeNickname.addEventListener('submit', (event) => {
  event.preventDefault();

  const nicknameInput = event.target.firstElementChild;

  nickname = nicknameInput.value;

  socket.emit('setNickname', { id: socket.id, nickname });

  nicknameInput.value = '';
});

const updateOnlineUsers = (onlineUsers) => {
  const users = document.querySelector('#users');
  users.innerHTML = '';

  onlineUsers.forEach(({ id, nickname: nickText }) => {
    addToStageNewLi(nickText, ONLINE_USER, 'users', id);
  });
};

socket.on('setOnlineUsers', (onlineUsers) => {
  updateOnlineUsers(onlineUsers);
});

socket.on('message', (message) => {
  addToStageNewLi(message, 'message', 'messages');
});
