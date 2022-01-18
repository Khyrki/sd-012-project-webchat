const socket = window.io();

const nickElem = document.querySelector('#online-user');

const randomNick = Array.from(Array(16), 
  () => Math.floor(Math.random() * 36).toString(36)).join('');
// https://stackoverflow.com/questions/10726909/random-alpha-numeric-string-in-javascript

const userNickname = sessionStorage.getItem('nick') || randomNick;
nickElem.innerHTML = userNickname;
socket.emit('newUser', userNickname);

const changeNickInput = document.querySelector('#nickname-box');
const changeNickButton = document.querySelector('#nickname-button');

changeNickInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') changeNickButton.click();
});

changeNickButton.addEventListener('click', () => {
  const newNick = changeNickInput.value;
  changeNickInput.value = '';
  nickElem.innerHTML = newNick;
  sessionStorage.setItem('nick', newNick);
  socket.emit('updateNick', newNick);
});

const sendButton = document.querySelector('#send-button');
const messageInput = document.querySelector('#message-box');

messageInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') sendButton.click();
});

sendButton.addEventListener('click', () => {
  const chatMessage = messageInput.value;
  const nickname = nickElem.innerHTML;
  socket.emit('message', { chatMessage, nickname });
  messageInput.value = '';
});

const chatElem = document.querySelector('#chat-box');

socket.on('message', (message) => {
  const li = document.createElement('li');
  li.innerHTML = message;
  li.setAttribute('data-testid', 'message');
  chatElem.appendChild(li);
});

const onlineUsersElem = document.querySelector('#users-list');

socket.on('onlineUsers', (onlineUsers) => {
  onlineUsersElem.innerHTML = '';
  onlineUsers.forEach(({ nickname }) => {
    const currentNickName = nickElem.innerHTML;
    if (currentNickName === nickname) return;
    const li = document.createElement('li');
    li.innerHTML = nickname;
    li.setAttribute('data-testid', 'online-user');
    onlineUsersElem.appendChild(li);  
  });
});

window.onbeforeunload = () => {
  socket.disconnect();
};
