const socket = window.io();

const submitButton = document.querySelector('.submit-btn');
const saveNickButton = document.querySelector('.save-nick');
const messageInput = document.querySelector('.submit-input');
const nickNameInput = document.querySelector('#input-nickname');
const messageList = document.querySelector('.message-list');

submitButton.addEventListener('click', () => {
  if (messageInput.value !== '') {
    const nickName = sessionStorage.getItem('nickName');
    socket.emit('message', { nickName, message: messageInput.value });
    messageInput.value = '';
  }
});

saveNickButton.addEventListener('click', () => {
  if (nickNameInput.value !== '') {
    sessionStorage.setItem('nickName', nickNameInput.value);
    socket.emit('changeNickName', nickNameInput.value);
    nickNameInput.value = '';
  }
});

const pushMessage = (message) => {
  const newItem = document.createElement('li');
  newItem.setAttribute('data-testid', 'message');
  newItem.innerText = message;
  messageList.appendChild(newItem);
};

const changeNickName = (nickNames) => {
  const userList = document.querySelector('.users-list');
  userList.innerHTML = '';
  nickNames.forEach(({ nickName, id }) => {
    if (id === socket.id) sessionStorage.setItem('nickName', nickName);
    const newUser = document.createElement('li');
    newUser.setAttribute('data-testid', 'user');
    newUser.innerText = nickName;
    userList.appendChild(newUser);
  });
};

socket.on('message', pushMessage);

socket.on('nickName', changeNickName);
