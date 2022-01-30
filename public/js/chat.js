const socket = window.io();

const nicknameClass = '.onlineUser';

const nicknameForm = document.querySelector('.nicknameForm');
const nicknameInput = document.querySelector('#nicknameInput');

const messageForm = document.querySelector('.messageForm');
const inputMessage = document.querySelector('#messageInput');

nicknameForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const nickname = document.querySelector(nicknameClass);
  socket.emit('nicknameChange', { oldNick: nickname.innerHTML, newNick: nicknameInput.value });
  nicknameInput.value = '';
});

const changeHTMLNickName = (newNickname) => {
  const nickname = document.querySelector(nicknameClass);
  nickname.innerHTML = newNickname;
};

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const nickname = document.querySelector(nicknameClass);
  socket.emit('message', { nickname: nickname.innerHTML, chatMessage: inputMessage.value });
  inputMessage.value = '';
});

const createMessage = (message) => {
  const messagesUl = document.querySelector('.messages');
  const li = document.createElement('li');
  li.dataset.testid = 'message';
  li.innerText = message;
  messagesUl.appendChild(li);
};

const createHistoryMessageList = (history) => {
  const messagesUl = document.querySelector('.messages');
  history.map(({ message, nickname, timestamp }) => {
    const li = document.createElement('li');
    li.dataset.testid = 'message';
    li.innerText = `${timestamp} - ${nickname}: ${message}`;
    messagesUl.appendChild(li);
    return false;
  });
};

const makeThisUserList = (users, thisNickname) => {
  const thisUserList = [...users];
  const arrayPos = thisUserList.findIndex((list) => list.nickname === thisNickname);
  const thisUser = thisUserList.splice(arrayPos, 1);
  thisUserList.unshift(thisUser[0]);
  return thisUserList;
};

const createUsersList = (users) => {
  const thisNickname = (document.querySelector(nicknameClass)).innerText;
  const userList = makeThisUserList(users, thisNickname);

  const userListHTML = document.querySelector('.userList');
  userListHTML.innerHTML = '';

  userList.map(({ nickname }) => {
    const li = document.createElement('li');
    li.dataset.testid = 'online-user';
    li.className = 'onlineUser';
    li.innerText = nickname;
    userListHTML.appendChild(li);
    return false;
  });
};

socket.on('message', (message) => createMessage(message));

socket.on('nicknameChange', (newNickname) => changeHTMLNickName(newNickname));

socket.on('userList', (users) => createUsersList(users));

socket.on('messageHistory', (history) => createHistoryMessageList(history));

socket.emit('newUser');

// window.onload = () => createUsersList([socket.id.slice(0, 16)]);
// window.onload = () => createUsersList(['AAAAAAAAAAAAAAAA']);

window.onbeforeunload = () => socket.disconnect();
