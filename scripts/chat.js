const socket = window.io();

const saveName = document.getElementById('nick-save');
const sendMsg = document.getElementById('send-btn');
let nickName = '';

sendMsg.addEventListener('click', (event) => {
event.preventDefault();
const msgInput = document.getElementById('message-input');
socket.emit('message', { nickName, chatMessage: msgInput.value });
// limpando a mensagen 
msgInput.innerHTML = '';
});
saveName.addEventListener('click', (event) => {
  event.preventDefault();
  const Input = document.getElementById('nickName-input');
  socket.emit('change', Input.value);
});

socket.on('nick', (nick) => {
  const nickSpan = document.getElementById('user  -span');
  nickName = nick;
  nickSpan.innerHTML = nickName;
});
