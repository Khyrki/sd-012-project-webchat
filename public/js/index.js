const socket = window.io();

let nickname = '';

const addToStageNewLi = (text, testId, fatherId, id) => {
  const listElement = document.getElementById(fatherId);

  const li = document.createElement('li');
  const liText = document.createTextNode(text);

  if (id) {
    li.setAttribute('id', id);
  }

  li.setAttribute('data-testid', testId);

  li.appendChild(liText);
  listElement.appendChild(li);
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

socket.on('userConnect', ({ id, nickname: nickText }) => {
  if (id === socket.id) { nickname = nickText; }
  addToStageNewLi(nickText, 'online-user', 'users', id);
});

socket.on('userDisconnect', (id) => {
  const userToDelete = document.getElementById(id);
  if (userToDelete) { userToDelete.remove(); }
});

socket.on('setNickname', ({ id, nickname: nickText }) => {
  const nicknameLi = document.getElementById(id);
  nicknameLi.innerText = nickText;
  nickname = nickText;
});

socket.on('message', (message) => {
  addToStageNewLi(message, 'message', 'messages');
});
