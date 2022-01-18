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

const composeDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  
  let day = '';
  let month = '';

  if (date.getDay() + 1 < 10) {
    day = `0${date.getDay()}`;
  } else {
    day = date.getDay();
  }

  if (date.getMonth() + 1 < 10) {
    month = `0${date.getMonth() + 1}`;
  } else {
    month = date.getMonth() + 1;
  }

  const formattedDate = `${day}-${month}-${year}`;

  return formattedDate;
};

const composeHour = () => {
  const date = new Date();
  const hour = date.getHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getSeconds();

  const formattedHour = `${hour}:${minutes}:${seconds}`;
  
  return formattedHour;
};

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const date = composeDate();
  const hour = composeHour();
  const message = messageInput.value;
  const nickname = document.querySelector('#userName').innerText;

  const fomattedMessage = `${date} ${hour} - ${nickname}: ${message}`;

  socket.emit('message', { chatMessage: fomattedMessage, nickname });

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

const createMessage = ({ chatMessage }) => {
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
