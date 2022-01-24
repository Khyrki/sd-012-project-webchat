const socket = window.io();

const messageBox = document.getElementById('message-box');
const sendButton = document.getElementById('send-button');
const nicknameBox = document.getElementById('nickname-box');
const nicknameButton = document.getElementById('nickname-button');
const onlineUser = document.getElementById('online-user');
const messageUl = document.getElementById('messages');
const onlineUsersElem = document.getElementById('users-list');

const randomNickname = Array.from(Array(16), 
() => Math.floor(Math.random() * 36).toString(36)).join('');

const clientNickname = sessionStorage.getItem('nick') || randomNickname;
onlineUser.innerHTML = clientNickname;
socket.emit('create', clientNickname);

sendButton.addEventListener('click', () => {
  socket.emit('message', { chatMessage: messageBox.value, nickname: onlineUser.innerHTML });
  messageBox.value = '';
});

nicknameButton.addEventListener('click', () => {
  const newNickname = nicknameBox.value;
  nicknameBox.value = '';
  onlineUser.innerHTML = newNickname;
  sessionStorage.setItem('nickname', newNickname);
  socket.emit('updateNickname', newNickname);
});

function messageCreation(message) {
  const messageLi = document.createElement('li');
  messageLi.classList.add('message');
  messageLi.setAttribute('data-testid', 'message');
  messageLi.innerText = message;

  messageUl.appendChild(messageLi);
}

socket.on('message', (message) => messageCreation(message));

socket.on('onlineUsers', (onlineUsers) => {
  onlineUsersElem.innerHTML = '';
  onlineUsers.forEach(({ nickname }) => {
    const currentNickName = onlineUser.innerHTML;
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