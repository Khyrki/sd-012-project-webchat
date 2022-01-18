const socket = window.io();

// const formMessage = document.querySelector('.form-message');
const inputMessage = document.querySelector('.message-box');
const sendButton = document.querySelector('.send-button');

const nicknameInput = document.querySelector('.nickname-box');
const nicknameButton = document.querySelector('.nickname-button');

const onlineUser = document.querySelector('.online-user');

const randomName = Math.random().toString(10).substr(2, 16);
onlineUser.innerHTML = sessionStorage.getItem('nickname') || randomName;

sendButton.addEventListener('click', () => {
  socket.emit('message', { chatMessage: inputMessage.value, nickname: onlineUser.innerHTML });
  inputMessage.value = '';
});

nicknameButton.addEventListener('click', () => {
  const newNickname = nicknameInput.value;
  console.log('oi');
  nicknameInput.value = '';
  onlineUser.innerHTML = newNickname;
  sessionStorage.setItem('nickname', newNickname);
});

const messageUl = document.querySelector('.messages');

function messageCreation(message) {
  const messageLi = document.createElement('li');
  messageLi.classList.add('message');
  messageLi.setAttribute('data-testid', 'message');
  messageLi.innerText = message;

  messageUl.appendChild(messageLi);
}

socket.on('message', (message) => messageCreation(message));

// window.onbeforeunload = (_e) => socket.disconnect();
