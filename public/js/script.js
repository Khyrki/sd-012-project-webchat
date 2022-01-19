const socket = window.io();

window.onbeforeunload = (_event) => {
  socket.disconnect();
};

const nicknameForm = document.querySelector('#nicknameForm');
const nicknameInput = document.querySelector('#nicknameInput');
const nicknameList = document.querySelector('#nicknameList');
const messageForm = document.querySelector('#messageForm');
const messageInput = document.querySelector('#messageInput');
const messageList = document.querySelector('#messageList');

nicknameForm.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('changeNick', nicknameInput.value);
  nicknameInput.value = '';
  return false;
});

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
  nicknameList.innerHTML = '';
  nickNameArray.forEach(({ nickname }) => {
    const listItem = document.createElement('li');
    listItem.setAttribute('class', 'nickname');
    listItem.setAttribute('data-testid', 'online-user');
  
    listItem.innerHTML = nickname;
  
    nicknameList.appendChild(listItem);
  });
};

const createMessage = (messagesArray) => {
  while (messageList.firstChild) {
    messageList.removeChild(messageList.firstChild);
  }
  messagesArray.forEach(({ chatMessage, nickname, timestamp }) => {
    const message = `${timestamp} - ${nickname}: ${chatMessage}`;
    const listItem = document.createElement('li');
    listItem.setAttribute('data-testid', 'message');
    listItem.innerText = message;

    messageList.appendChild(listItem);
  });
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

socket.on('message', (messagesArray) => createMessage(messagesArray));
socket.on('systemMessage', (systemMessage) => createSystemMessage(systemMessage));
socket.on('userName', (userName) => defineActualUserNamer(userName));
socket.on('nicknameList', (nickNameArray) => createNicknameList(nickNameArray));
