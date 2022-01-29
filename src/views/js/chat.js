const socket = window.io();

const nicknameShow = document.querySelector('#nicknameShow');
const nicknameForm = document.querySelector('#nicknameForm');
const nicknameInput = document.querySelector('#nicknameInput');
const messageForm = document.querySelector('#messageForm');
const messageInput = document.querySelector('#messageInput');
const messages = document.querySelector('#messages');

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const generateString = (length) => {
    let result = ' ';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i += 1) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
};

// Gerador de id - https://www.programiz.com/javascript/examples/generate-random-strings

if (!sessionStorage.getItem('nickname')) {
  const nickname = generateString(16);
  sessionStorage.setItem('nickname', nickname);
  nicknameShow.innerText = nickname;
}

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const nickname = sessionStorage.getItem('nickname');
  const chatMessage = messageInput.value;
  socket.emit('sendMessage', { chatMessage, nickname });
  messageInput.value = '';
  return false;
});

nicknameForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const nickname = nicknameInput.value;
  sessionStorage.setItem('nickname', nickname);
  nicknameShow.innerText = nickname;
  nicknameInput.value = '';
  return false;
});

const createMessage = (message) => {
  const li = document.createElement('li');
  li.innerText = message;
  li.setAttribute('data-testid', 'message');
  messages.appendChild(li);
};

const createHistory = (history) => {
  history.forEach(({ message, nickname, timestamp }) => {
    const li = document.createElement('li');
    li.innerText = `(${timestamp}) ${nickname}: ${message}`;
    li.setAttribute('data-testid', 'message');
    messages.appendChild(li);
  });
};

socket.emit('getHistory');
socket.on('newMessage', (message) => createMessage(message));
socket.on('sendHistory', (history) => createHistory(history));

window.onbeforeunload = () => {
  socket.disconnect();
};