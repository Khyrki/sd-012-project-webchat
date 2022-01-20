const socket = window.io();

const submitButton = document.querySelector('#submit-btn');
const saveNickButton = document.querySelector('#save-nick');

submitButton.addEventListener('click', () => {
  const messageInput = document.querySelector('#submit-input');
  if (messageInput !== '') {
    const nickName = sessionStorage.getItem('nickName');
    socket.emit('message', { nickName, message: messageInput.value });
  }
});

saveNickButton.addEventListener('click', () => {
  const nickNameInput = document.querySelector('#input-nickname');
  if (nickNameInput !== '') {
    sessionStorage.setItem('nickName', nickNameInput.value);
  }
});

const pushMessage = (message) => {
  const messageList = document.querySelector('#message-list');
  const newItem = document.createElement('li');
  newItem.setAttribute('data-testid', 'message');
  newItem.innerText = message;
  messageList.appendChild(newItem);
};

const changeNickName = (nick) => {
  console.log('chegou aqui');
  sessionStorage.set('nickName', nick);
  const userList = document.querySelector('#users-list');
  const newUser = document.createElement('li');
  newUser.setAttribute('data-testid', 'user');
  newUser.innerText = nick;
  userList.appendChild(newUser);
};

socket.on('message', pushMessage);

socket.on('nickName', changeNickName);