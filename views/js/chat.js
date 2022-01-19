const socket = window.io();

const nickNameDisplayer = document.getElementById('userNickname');
const messageBox = document.getElementById('messageBox');
// const sendButton = document.getElementById('sendButton');
const messageForm = document.getElementById('messageForm');

const setNickname = (nickName) => {
  nickNameDisplayer.innerText = nickName;
};

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const chatMessage = messageBox.value;
  const nickName = nickNameDisplayer.innerText;
  socket.emit('message', { chatMessage, nickName });
  messageBox.value = '';
  return false;
});

socket.on('newConnection', (socketId) => {
  const sixteenCarachNick = socketId.substring(0, 16);

  if (sessionStorage.getItem('key')) {
    return setNickname(sessionStorage.getItem('key'));
  }

  sessionStorage.setItem('key', sixteenCarachNick);

  setNickname(sixteenCarachNick);
});