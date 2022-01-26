const socket = window.io();

const dataTest = 'data-testid';

const boxNick = document.getElementById('box-nick');
const btnNick = document.getElementById('btn-nick');
const boxMsg = document.getElementById('box-msg');
const btnMsg = document.getElementById('btn-msg');

let userName = '';

btnMsg.addEventListener('click', (event) => {
  event.preventDefault();
  const nickname = userName || socket.id.slice(0, 16);
  socket.emit('message', { chatMessage: boxMsg.value, nickname });
  boxMsg.value = '';
});

const userMessage = (message) => {
  const msg = document.getElementById('mensagensUsuarios');
  const li = document.createElement('li');
  li.innerText = message;
  li.setAttribute(dataTest, 'message');
  msg.appendChild(li);
};

btnNick.addEventListener('click', (event) => {
  event.preventDefault();
  userName = boxNick.value;
  if (userName !== '') {
    socket.emit('newName', userName);
    boxNick.value = '';
  }
});

const userList = (onlineUser) => {
  const newNickFormat = socket.id.slice(0, 16);
  const usr = document.getElementById('usuariosOnline');
  usr.innerHTML = '';
  onlineUser.forEach((element) => {
    const li = document.createElement('li');
    li.setAttribute(dataTest, 'online-user');
    li.innerText = element;
    if (element === userName || element === newNickFormat) {
      return usr.prepend(li);
    }
    usr.appendChild(li);
  });
};

const messagensDB = (allMessages) => {
  allMessages.forEach(({ dataTime, nickname, chatMessage }) => {
  const msg = document.getElementById('mensagensUsuarios');
  const li = document.createElement('li');
  li.innerText = `${dataTime} - ${nickname} : ${chatMessage}`;
  li.setAttribute(dataTest, 'message');
  msg.appendChild(li);
  });
};
socket.on('messagesHistory', (allMessages) => messagensDB(allMessages));

socket.on('message', (chatMessage) => userMessage(chatMessage));

socket.on('userList', (onlineUser) => userList(onlineUser));