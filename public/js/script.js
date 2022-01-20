const socket = window.io();

window.onbeforeunload = (_event) => {
  socket.disconnect();
};

const testid = 'data-testid';

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
  const nickname = document.querySelector('#userName').innerText;
  const chatMessage = messageInput.value;
  socket.emit('message', { chatMessage, nickname });
  messageInput.value = '';
  return false;
});

const changePosition = (array) => {
  if (!array) return [];
  let indexOf = '';
  const userNickname = document.querySelector('#userName').innerText;

  array.forEach((item, index) => {
    if (item.nickname === userNickname) {
      indexOf = index;
    }
  });
/* fonte do código para mudar a posicao do array 
https://www.horadecodar.com.br/2020/03/30/javascript-mudar-a-posicao-de-um-elemento-no-array/ */
  const newArray = [...array];
  newArray.splice(0, 0, newArray.splice(indexOf, 1)[0]);
  return newArray;
};

const createNicknameList = ((socketUsers) => {
  nicknameList.innerHTML = '';
  const nickNameArray = changePosition(socketUsers);

  nickNameArray.forEach(({ nickname }) => {
    const listItem = document.createElement('li');
    listItem.setAttribute('class', 'nickname');
    listItem.setAttribute(testid, 'online-user');
    listItem.innerText = nickname;
    nicknameList.appendChild(listItem);
  });
});

const createMessage = (message) => {
  const listItem = document.createElement('li');
    listItem.setAttribute(testid, 'message');
    listItem.innerText = message;

    messageList.appendChild(listItem);
};

const defineActualUserNamer = (userName) => {
  const messageLabel = document.querySelector('#userName');

  messageLabel.innerText = userName;
};

const renderPastMessages = (messagesArray) => {
  messagesArray.forEach((message) => createMessage(message));
};

socket.on('message', (message) => createMessage(message));
socket.on('userName', (userName) => defineActualUserNamer(userName));
socket.on('onlineUsersList', (nickNameArray) => createNicknameList(nickNameArray));
socket.on('pastMessages', (messagesArray) => renderPastMessages(messagesArray));
