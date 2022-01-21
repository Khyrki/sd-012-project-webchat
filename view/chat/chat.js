const socket = window.io();

const submitButton = document.querySelector('.submit-btn');
const saveNickButton = document.querySelector('.save-nick');
const messageInput = document.querySelector('.submit-input');
const nickNameInput = document.querySelector('#input-nickname');
const messageList = document.querySelector('.message-list');

const submitMessage = () => {
  if (messageInput.value !== '') {
    const nickname = sessionStorage.getItem('nickName');
    socket.emit('message', { nickname, chatMessage: messageInput.value });
    messageInput.value = '';
  }
};

submitButton.addEventListener('click', () => submitMessage());

messageInput.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    submitMessage();
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

const generateLi = (content, testid) => {
  const newLi = document.createElement('li');
  newLi.setAttribute('data-testid', testid);
  newLi.innerText = content;
  return newLi;
};

const pushMessage = (message) => {
  const myNickName = sessionStorage.getItem('nickName');
  const newItem = document.createElement('li');
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
  const myUser = nickNames.find(({ id }) => id === socket.id);
  const myuserLi = generateLi(myUser.nickName, 'online-user');
  userList.appendChild(myuserLi);
  nickNames.forEach(({ nickName, id }) => {
    if (id === socket.id) {
      sessionStorage.setItem('nickName', nickName);
      return;
    }
    const list = generateLi(nickName, 'online-user');
    userList.appendChild(list);
  });
};

socket.on('message', pushMessage);

socket.on('nickName', changeNickName);
