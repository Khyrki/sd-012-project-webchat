const socket = window.io();
const sendMessageForm = document.querySelector('.send-message-form');
const changeNicknameForm = document.querySelector('.change-nickname-form');
const inputMessage = document.querySelector('#message-box');
const inputNickname = document.querySelector('#nickname-box');
const nicknameLabel = document.querySelector('#main-user');
const usersUl = document.querySelector('.online-users');
const testId = 'data-testid';

const clearOnlineUsersUl = () => {
  while (usersUl.firstChild) usersUl.removeChild(usersUl.firstChild);
};

const renderOnlineUsers = (users) => {
  if (users) {
    clearOnlineUsersUl();
    const mainNickname = nicknameLabel.innerHTML;
    users.forEach((user) => {
      if (user.nickname === mainNickname) return;
      const li = document.createElement('li');
      li.innerText = user.nickname;
      li.setAttribute(testId, 'online-user');
      usersUl.appendChild(li);
    });
  }
};

const createSession = () => {
  const session = sessionStorage.getItem('sessionId');
  if (session) {
    socket.auth = { session };
    socket.connect();
  }
  socket.on('session', ({ sessionId, nickname }) => {
    socket.auth = { sessionId };
    sessionStorage.setItem('sessionId', sessionId);
    sessionStorage.setItem('nickname', nickname);
    nicknameLabel.innerText = nickname;
  });
};

createSession();

sendMessageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const chatMessage = inputMessage.value;
  socket.emit('message', { nickname: sessionStorage.getItem('nickname'), chatMessage });
  inputMessage.value = '';
  return false;
});

changeNicknameForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const sessionId = sessionStorage.getItem('sessionId');
  nicknameLabel.innerText = inputNickname.value;
  sessionStorage.setItem('nickname', inputNickname.value);
  socket.emit('changeNickname', inputNickname.value, sessionId);
  inputNickname.value = '';
  return false;
});

const createMessage = (message) => {
  const messagesUl = document.querySelector('.messages');
  const li = document.createElement('li');
  li.innerText = message;
  li.setAttribute(testId, 'message');
  messagesUl.appendChild(li);
};

socket.on('message', (message) => createMessage(message));

socket.on('history', (messages) => {
  const messagesUl = document.querySelector('.messages');
  messages.forEach(({ message, nickname, timestamp }) => {
    const li = document.createElement('li');
    li.innerText = `${timestamp} - ${nickname}: ${message}`;
    li.setAttribute(testId, 'message');
    messagesUl.appendChild(li);
  });
});

socket.on('users', (users) => {
  renderOnlineUsers(users);
});

socket.on('newUser', (users) => {
  renderOnlineUsers(users);
});

socket.on('disconnected', (users) => {
  renderOnlineUsers(users);
});

window.onbeforeunload = function e(_event) {
  socket.on('disconnect');
};
