const socket = window.io();

const messageForm = document.querySelector('#message-form');
const messageBox = document.querySelector('#message-box');
const messageList = document.querySelector('#message-list'); 

const nicknameForm = document.querySelector('#nickname-form');
const nicknameBox = document.querySelector('#nickname-box');

const usersList = document.querySelector('#users-list');

let nickname = '';
const testId = 'data-testid';

const saveNickNameInStorage = (nicknoun) => {
  sessionStorage.setItem('nickname@webchat', nicknoun);
};

const getNicknameFromStorage = () => sessionStorage.getItem('nickname@webchat');

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
//   console.log('get the message?'); shows the message in front - console
  socket.emit('message', {
    chatMessage: messageBox.value,
    nickname,
  });
  messageBox.value = '';
});

nicknameForm.addEventListener('submit', (e) => {
  e.preventDefault();
  nickname = nicknameBox.value;
  saveNickNameInStorage(nicknameBox.value);
  console.log('nickame saved', getNicknameFromStorage());
  socket.emit('updateNickname', nickname);
});

const addMessageToList = (msgContent) => {
  const newMsg = document.createElement('li');
  newMsg.innerHTML = msgContent;
  newMsg.setAttribute(testId, 'message');
  messageList.appendChild(newMsg);
};

const addUserToList = (nicknoun, testid) => {
  const userElement = document.createElement('li');
  userElement.innerText = nicknoun;
  userElement.setAttribute(testId, testid);

  usersList.appendChild(userElement);
};

const renderUsersList = (users) => {
  usersList.innerHTML = '';

  const currentUser = users[socket.id];
  addUserToList(currentUser, 'online-user');

  const otherUsers = Object.keys(users).filter((userId) => userId !== socket.id);
  otherUsers.forEach((userId) => {
    addUserToList(users[userId], 'other-user');
  });
};

const renderMessages = (msgs) => {
  msgs.forEach((msg) => {
    const { message, nickname: nicknoun, timestamp } = msg;
    const newMsg = document.createElement('li');
    newMsg.innerText = `${timestamp} - ${nicknoun}: ${message}`;
    newMsg.setAttribute(testId, 'message');

    messageList.appendChild(newMsg);
  });
};

// connection that allows getting a message from server and add it to the list
socket.on('message', (msg) => { 
  console.log(msg);
  addMessageToList(msg);
});
// connection that allows getting the nickname
socket.on('getNickname', (nicknoun) => {
  const nicknameFromStorage = getNicknameFromStorage();
  if (!nicknameFromStorage) {
    saveNickNameInStorage(nicknoun);
    nickname = nicknoun;
  }
    nickname = nicknameFromStorage;
    console.log('getting nickname from storage ahead');
    socket.emit('updateNickname', nicknoun);
});

socket.on('updateUsers', (users) => {
  console.log('updatedUsers aqui');
  renderUsersList(users);
});

socket.on('refreshMessages', (msgs) => {
  renderMessages(msgs);
});
