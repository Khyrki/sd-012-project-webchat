const socket = window.io();

const datatest = 'data-testid';

const formMessage = document.getElementById('formMessage');
const formNickname = document.getElementById('formNickname');
const messageInput = document.getElementById('input-msg');
const nicknameInput = document.getElementById('input-nickname');
const messageList = document.getElementById('message-list');
const usersList = document.getElementById('users');
const userSpan = document.querySelector('#online-user');

const randomString = () => {
  const abc = 'abcdefghijklmnopqrstuvwxxyz0123456789';
  const randomShit = [];
  const abcSplit = abc.split('');

  for (let index = 0; randomShit.length < 16; index = (Math.floor(Math.random() * 10))) {
    randomShit.push(abcSplit[index]);
  }

  return randomShit.join('');
};

const newUser = () => {
  const alreadyExists = sessionStorage.getItem('nickname');

  const newU = alreadyExists || randomString();
  sessionStorage.setItem('nickname', newU);
  userSpan.innerHTML = newU;
  socket.emit('user', newU);
};

socket.on('loadMessages', (messages) => {
  if (messages) {
    messageList.innerText = '';
    messages.forEach((m) => {
      const li = document.createElement('li');
      li.setAttribute(datatest, 'message');
      li.innerText = `${m.timestamp} - ${m.nickname}: ${m.message}`;
      messageList.appendChild(li);
    });
  }
});

socket.on('message', (msg) => {
  if (typeof msg === 'string') {
    const li = document.createElement('li');
    li.setAttribute(datatest, 'message');
    li.innerText = msg;
    messageList.appendChild(li);
    return false;
  }
});

socket.on('user', (users) => {
  usersList.innerHTML = '';
  
  users.forEach((user) => {
    const currentUser = userSpan.innerHTML;
    if (currentUser === user.nickname) return null;
    const li = document.createElement('li');
    li.setAttribute(datatest, 'online-user');
    li.innerText = user.nickname;
    usersList.appendChild(li);
    return false;
  });
});

formNickname.addEventListener('submit', (e) => {
  e.preventDefault();

  if (nicknameInput.value === '') {
    sessionStorage.setItem('nickname', randomString());
    socket.emit('updateNickname', randomString());
    return false;
  }

  userSpan.innerHTML = nicknameInput.value;
  sessionStorage.setItem('nickname', nicknameInput.value);
  socket.emit('updateNickname', nicknameInput.value);
});

formMessage.addEventListener('submit', (e) => {
  e.preventDefault();

  const message = {
    chatMessage: messageInput.value,
    nickname: sessionStorage.getItem('nickname'),
  };

  socket.emit('message', message);
  messageInput.value = '';
  return false;
});

window.addEventListener('load', () => {
  newUser();
});

window.onbeforeunload = () => {
  socket.disconnect();
};
