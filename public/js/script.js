const socket = window.io();

window.onbeforeunload = (_event) => {
  socket.disconnect();
};

// const nicknameForm = document.querySelector('#nicknameForm');
// const nicknameInput = document.querySelector('#nicknameInput');
const nicknameList = document.querySelector('#nicknameList');
const messageForm = document.querySelector('#messageForm');
const messageInput = document.querySelector('#messageInput');
const messageList = document.querySelector('#messageList');

// nicknameForm.addEventListener('submit', (e) => {
//   e.preventDefault();
//   socket.emit('nickname', nicknameInput.value);
//   nicknameInput.value = '';
//   return false;
// });

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const message = messageInput.value;
  const nickname = document.querySelector('#userName').innerText;

  const chatMessage = message;

  socket.emit('message', { chatMessage, nickname });

  messageInput.value = '';
  return false;
});

const createNicknameList = (nickNameArray) => {
  while (nicknameList.firstChild) {
    nicknameList.removeChild(nicknameList.firstChild);
  }
  nickNameArray.forEach(({ nickname }) => {
    const listItem = document.createElement('li');
    listItem.setAttribute('class', 'nickname');
  
    listItem.innerText = nickname;
  
    nicknameList.appendChild(listItem);
  });
};

const createMessage = (chatMessage) => {
  const listItem = document.createElement('li');

  listItem.innerText = chatMessage;

  messageList.appendChild(listItem);
};

const defineActualUserNamer = (userName) => {
  const messageLabel = document.querySelector('#userName');

  messageLabel.innerText = userName;
};

const createSystemMessage = (message) => {
  const listItem = document.createElement('li');

  listItem.innerText = message;

  messageList.appendChild(listItem);
};

socket.on('message', (chatMessage) => createMessage(chatMessage));
socket.on('systemMessage', (systemMessage) => createSystemMessage(systemMessage));
socket.on('userName', (userName) => defineActualUserNamer(userName));
socket.on('nicknameList', (nickNameArray) => createNicknameList(nickNameArray));
