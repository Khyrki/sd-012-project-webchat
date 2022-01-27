// Função `generateRandomString` Retirada de https://qastack.com.br/programming/1349404/generate-random-string-characters-in-javascript
function generateRandomString(length) {
  let result = '';

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

const socket = window.io();

// window.onbeforeunload - É disparado quando o window, o document e seus recursos estão prestes a ser descarregados.
window.onbeforeunload = () => {
  socket.disconnect();
};

let nickname = generateRandomString(16);
let originalNickname = nickname;

const online = 'online-user';
const users = document.getElementById('users');
const userForm = document.getElementById('users-form');
const userInput = document.getElementById('user-input');
const messages = document.getElementById('messages');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');

const user = document.createElement('li');
user.innerText = nickname;
user.dataset.testid = online;

window.onload = () => {
  if (!users.firstChild) {
 users.appendChild(user);
  } else {
    users.insertBefore(user, users.firstChild);
  }
  socket.emit('createUser', { originalNickname });
};

userForm.addEventListener('submit', (e) => {
  e.preventDefault();

  if (userInput.value) {
    originalNickname = nickname;
    nickname = userInput.value;

    socket.emit('changeNickname', { originalNickname, nickname });
    userInput.value = '';
  }
});

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();

  if (messageInput.value) {
    socket.emit('message', { chatMessage: messageInput.value, nickname });
    messageInput.value = '';
  }
});

socket.on('changeNickname', (usernames) => {
  users.innerText = '';

  const thisUser = document.createElement('li');
  thisUser.innerText = nickname;
  thisUser.dataset.testid = online;

  users.appendChild(thisUser);

  usernames.forEach((element) => {
    const item = document.createElement('li');

    item.innerText = element;
    item.dataset.testid = online;

    if (element !== nickname) users.appendChild(item);
  });
});

socket.on('message', (msg) => {
  const item = document.createElement('li');

  item.innerText = msg;
  item.dataset.testid = 'message';

  messages.appendChild(item);
  // `window.scrollTo` - faz uma rolagem para um conjunto de coordenadas em particular em um documento.
  window.scrollTo(0, document.body.scrollHeight);
}); 