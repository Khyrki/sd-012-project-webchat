const socket = window.io();

// Functions
function insertDiv(testId, text, element) {
  const div = document.createElement('div');
  div.setAttribute('data-testid', testId);
  div.innerText = text;

  element.appendChild(div);
}

// User
const users = document.querySelector('.users');
const inputNick = document.getElementById('user');
const saveButton = document.getElementById('save');

function getNickname() {
  return inputNick.value;
}

function insertUser(text) {
  insertDiv('online-user', text, users);
}

saveButton.addEventListener('click', () => {
  const nickname = getNickname();
  if (nickname !== undefined) {
    socket.emit('user', nickname);
  }
});

socket.on('newUser', (nickname) => {
  insertUser(nickname);
});

// Message
const chat = document.querySelector('.chat');
const sendButton = document.getElementById('send');
const inputMessage = document.getElementById('message');

function getChatMessage() {
  return inputMessage.value;
}

function insertMessage(text) {
  insertDiv('message', text, chat);
  inputMessage.value = '';
}

sendButton.addEventListener('click', () => {
  const nickname = getNickname();
  const chatMessage = getChatMessage();
  if (chatMessage !== undefined) {
    socket.send({ nickname, chatMessage });
  }
});

socket.on('message', (message) => {
  insertMessage(message);
});

// socket.on('listMessage', (messages) => {
  // messages.forEach((message) => {
    // insertMessage(message);
  // });
// });
