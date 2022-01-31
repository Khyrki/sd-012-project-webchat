const socket = window.io();

function getById(id) {
  return document.getElementById(id);
}

const boxUsers = getById('box_users');
const inputUser = getById('input_user');
const buttonUser = getById('button_user');

const boxMessages = getById('box_messages');
const inputMessage = getById('input_message');
const buttonMessage = getById('button_message');

function insert(id, value, boxElement) {
  const div = document.createElement('div');
  div.setAttribute('data-testid', id);
  div.innerText = value;

  boxElement.appendChild(div);
}

function insertUser(value) {
  insert('online-user', value, boxUsers);
}

function insertMessage(value) {
  insert('message', value, boxMessages);
}

function saveUser() {
  socket.emit('changeUser', inputUser.value);
}

function sendMessage() {
  const data = {
    nickname: inputUser.value,
    chatMessage: inputMessage.value,
  };

  inputMessage.value = '';
  socket.send(data);
}

socket.on('insertUser', (nickname) => {
  insertUser(nickname);
});

socket.on('insertMessage', (message) => {
  insertMessage(message);
});

socket.on('connected', (nickname) => {
  inputUser.value = nickname;
});

socket.on('changeAnotherUser', (nickname) => {
  const user = document.querySelector(`#box_users:contains('${nickname}')`);
  user.innerText = nickname;
});

socket.on('disconnected', (nickname) => {
  const user = document.querySelector(`#box_users:contains('${nickname}')`);
  user.remove();
});

buttonUser.addEventListener('click', saveUser);
buttonMessage.addEventListener('click', sendMessage);
