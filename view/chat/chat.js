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

const autoScroll = () => {
  const div = document.querySelector('.message-scroll');
  div.scrollTop = div.scrollHeight;
};

autoScroll();

saveNickButton.addEventListener('click', () => {
  if (nickNameInput.value !== '') {
    sessionStorage.setItem('nickName', nickNameInput.value);
    socket.emit('changeNickName', nickNameInput.value);
    nickNameInput.value = '';
  }
});

const pushMessage = (message) => {
  const newItem = document.createElement('li');
  const myNickName = sessionStorage.getItem('nickName');
  if (message.includes(myNickName)) {
    newItem.style.alignSelf = 'flex-end';
    newItem.style.borderRadius = '50px 50px 0 50px';
    newItem.style.backgroundColor = '#134e5e';
  }
  newItem.setAttribute('data-testid', 'message');
  newItem.innerText = message;
  messageList.appendChild(newItem);
  autoScroll();
};

const changeNickName = (nickNames) => {
  const userList = document.querySelector('.users-list');
  userList.innerHTML = '';
  nickNames.forEach(({ nickName, id }) => {
    if (id === socket.id) sessionStorage.setItem('nickName', nickName);
    const newUser = document.createElement('li');
    newUser.setAttribute('data-testid', 'online-user');
    newUser.innerText = nickName;
    userList.appendChild(newUser);
  });
};

socket.on('message', pushMessage);

socket.on('nickName', changeNickName);
