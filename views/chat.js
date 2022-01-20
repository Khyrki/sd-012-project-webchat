const socket = window.io();

const dataId = 'data-testid';

// const formMessage = document.querySelector('.form-message');
const inputMessage = document.querySelector('.message-box');
const sendButton = document.querySelector('.send-button');
const nicknameInput = document.querySelector('.nickname-box');
const nicknameButton = document.querySelector('.nickname-button');
const onlineUser = document.querySelector('.online-user');
const messageUl = document.querySelector('.messages');
const onlineUsers = document.querySelector('.online-users');

const randomName = Math.random().toString(10).substr(2, 16);

const sessionUser = sessionStorage.getItem('nickname') || randomName;
onlineUser.innerHTML = sessionUser;
socket.emit('create', sessionUser);

sendButton.addEventListener('click', () => {
  socket.emit('message', { chatMessage: inputMessage.value, nickname: onlineUser.innerHTML });
  inputMessage.value = '';
});

nicknameButton.addEventListener('click', () => {
  const newNickname = nicknameInput.value;
  nicknameInput.value = '';
  onlineUser.innerHTML = newNickname;
  sessionStorage.setItem('nickname', newNickname);
  socket.emit('updateNickname', newNickname);
});

function messageCreation(message) {
  const messageLi = document.createElement('li');
  messageLi.classList.add('message');
  messageLi.setAttribute(dataId, 'message');
  messageLi.innerText = message;
  messageUl.appendChild(messageLi);
}

socket.on('message', (message) => messageCreation(message));

socket.on('online', (list) => {
  // onlineUsers.innerHTML = '';
  // const givenUser = sessionStorage.getItem('nickname');
  // const li = document.createElement('li');
  // li.setAttribute(dataId, 'online-user');
  // li.innerText = givenUser;
  // onlineUsers.appendChild(li);

  list.forEach((user) => {
    // Basiado em https://github.com/tryber/sd-012-project-webchat/pull/1/commits/c3c35f5245126f97a31f415a96a4c48c4898c42f
    if (user.nickname === sessionUser) return null;
    const liEl = document.createElement('li');
    liEl.setAttribute(dataId, 'online-user');
    liEl.innerText = user.nickname;
    onlineUsers.appendChild(liEl);
  });
});

window.onbeforeunload = () => {
  socket.disconnect();
};