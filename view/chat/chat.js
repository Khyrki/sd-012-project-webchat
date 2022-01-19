const socket = window.io();
const datatestid = 'data-testid';

const createMessage = () => {
  const nickName = document.querySelector('#nickName').innerText;
  const messageInput = document.querySelector('#message-box');
  socket.emit('message', { chatMessage: messageInput.value, nickname: nickName });
  messageInput.value = '';
};

const createParticipant = (participant) => {
  const li = document.createElement('li');
  li.innerText = participant;
  li.setAttribute(datatestid, 'online-user');
  return li;
};

const changeNickname = (newNick) => {
  const nickname = document.querySelector('#nickName');
  nickname.innerText = newNick;
};

const changeOnlineUsers = (participants) => {
  const onlineUsers = document.querySelector('#onlineUsers');
  const userNick = document.querySelector('#nickName').innerText;
  onlineUsers.innerHTML = '';
  const li = document.createElement('li');
  li.innerText = userNick;
  li.setAttribute(datatestid, 'online-user');
  li.setAttribute('id', 'nickName');
  onlineUsers.appendChild(li);
  participants.forEach(({ nickName }) => {
    if (nickName !== userNick) {
      onlineUsers.appendChild(createParticipant(nickName));
    }
  });
};

const newMessage = (message) => {
  const messagesDiv = document.querySelector('#messages');
  const newMsg = document.createElement('li');
  newMsg.setAttribute(datatestid, 'message');
  newMsg.innerText = message;
  messagesDiv.appendChild(newMsg);
};

const messageButton = document.querySelector('#send-button');
const nicknameButton = document.querySelector('#changeNickName');

messageButton.addEventListener('click', (e) => {
  e.preventDefault();
  createMessage();
});

nicknameButton.addEventListener('click', (e) => {
  e.preventDefault();
  const inputNickname = document.querySelector('#nickname-box');
  changeNickname(inputNickname.value);
  socket.emit('changeNick', inputNickname.value);
  inputNickname.value = '';
});

socket.on('message', (message) => {
  newMessage(message);
});

socket.on('messageHistory', (message) => {
  newMessage(message);
});

socket.on('nickName', (newNick) => {
  changeNickname(newNick);
});

socket.on('participantChange', (participants) => {
  console.log('participantes mudaram');
  changeOnlineUsers(participants);
});

window.onbeforeunload = () => {
  socket.disconnect();
};