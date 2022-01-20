const socket = window.io();

const dataId = 'data-testid';

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

nicknameButton.addEventListener('click', () => {
  const newNickname = nicknameInput.value;
  nicknameInput.value = '';
  onlineUser.innerHTML = newNickname;
  sessionStorage.setItem('nickname', newNickname);
  socket.emit('updateNickname', newNickname);
});

sendButton.addEventListener('click', () => {
  socket.emit('message', { chatMessage: inputMessage.value, nickname: onlineUser.innerHTML });
  inputMessage.value = '';
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
  onlineUsers.innerHTML = '';

  list.forEach((user) => {
    // Baseado em https://github.com/tryber/sd-012-project-webchat/pull/1/commits/c3c35f5245126f97a31f415a96a4c48c4898c42f
    const currentUser = onlineUser.innerHTML;
    if (currentUser === user.nickname) return;
    const liEl = document.createElement('li');
    liEl.innerHTML = user.nickname;
    liEl.setAttribute(dataId, 'online-user');
    onlineUsers.appendChild(liEl);
  });
});

window.onbeforeunload = () => {
  socket.disconnect();
};