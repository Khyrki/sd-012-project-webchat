const socket = window.io();

const nickNameForm = document.querySelector('#nickNameForm');
const nickNameInnerText = document.querySelector('#nickNamePlace');
const nickNameInput = document.querySelector('#nickNameInput');
const formSendMessages = document.querySelector('#form-send-messages');
const messageInput = document.querySelector('#messageInput');
const nicknameButton = document.getElementById('recover-nickname-button');
const THERE_ISNT_YET = 'There isn\'t yet!';

const setSessionStorage = () => {
  sessionStorage.setItem('nickname', nickNameInput.value);
};

const receivedNickName = (nickname) => {
  nickNameInnerText.innerText = nickname;
};

socket.on('randomName', (content) => {
  receivedNickName(content);
  const storagedNickname = sessionStorage.getItem('nickname');
  if (!storagedNickname) {
    nicknameButton.value = THERE_ISNT_YET;
  } else {
    nicknameButton.value = storagedNickname;
  }
});

const eventListener = (where, typeEvent, socketFunctions) => {
  where.addEventListener(typeEvent, (e) => {
    e.preventDefault();
    socketFunctions();
  });
};

const socketEmitNickName = () => {
  socket.emit('nickName', nickNameInput.value);
  setSessionStorage();
  nickNameInput.value = '';
  return false;
};

eventListener(nickNameForm, 'submit', socketEmitNickName);

socket.on('newNickName', (newName) => receivedNickName(newName));

const socketEmitMessage = () => {
  socket.emit('message', {
    chatMessage: messageInput.value,
    nickname: nickNameInnerText.innerText,
  });
  messageInput.value = '';
  return false;
};

eventListener(formSendMessages, 'submit', socketEmitMessage);

const createMessage = (message) => {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerText = message;
  li.setAttribute('data-testid', 'message');
  messagesUl.appendChild(li);
};

socket.on('message', (message) => createMessage(message));

const ulUsers = document.querySelector('#connected-user');

const createUserList = (name) => {
  const li = document.createElement('li');
  li.innerText = name;
  li.setAttribute('data-testid', 'online-user');
  ulUsers.appendChild(li);
};

socket.on('connectedUsers', (arrayUser) => {
  ulUsers.innerHTML = '';
  const user = arrayUser.find(({ id }) => id === socket.id);
  
  const userFilter = arrayUser.filter(({ id }) => id !== socket.id);

  userFilter.unshift(user);
  
  userFilter.forEach(({ nickname }) => createUserList(nickname));
});

const recoverChosenName = () => {
  if (nicknameButton.value !== THERE_ISNT_YET) {
    nickNameInnerText.innerText = nicknameButton.value;
  }
};

const socketRecoverNickname = () => {
  recoverChosenName();
  socket.emit('nickName', nickNameInnerText.innerText);
};

eventListener(nicknameButton, 'click', socketRecoverNickname);

window.onbeforeunload = (_event) => {
  socket.disconnect();
};
