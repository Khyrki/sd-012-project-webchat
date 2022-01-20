const socket = window.io();

const nickNameForm = document.querySelector('#nickNameForm');
const nickNameInnerText = document.querySelector('#nickNamePlace');
const nickNameInput = document.querySelector('#nickNameInput');
const messageForm = document.querySelector('#messageForm');
const messageInput = document.querySelector('#messageInput');

const receivedNickName = (nickname) => {
  nickNameInnerText.innerText = nickname;
};

socket.on('randomName', (content) => receivedNickName(content));

const eventListener = (where, typeEvent, socketEmitFunction) => {
  where.addEventListener(typeEvent, (e) => {
    e.preventDefault();
    socketEmitFunction();
  });
};

const socketEmitNickName = () => {
  socket.emit('nickName', nickNameInput.value);
  nickNameInput.value = '';
  return false;
};

eventListener(nickNameForm, 'submit', socketEmitNickName);

socket.on('newNickName', (newName) => receivedNickName(newName));

const createMessage = (message) => {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerText = message;
  li.setAttribute('data-testid', 'message');
  messagesUl.appendChild(li);
};

const socketEmitMessage = () => {
  socket.emit('message', {
    chatMessage: messageInput.value,
    nickname: nickNameInnerText.innerText,
  });
  messageInput.value = '';
  return false;
};

eventListener(messageForm, 'submit', socketEmitMessage);

socket.on('message', (message) => createMessage(message));

window.onbeforeunload = (_event) => {
  socket.disconnect();
};
