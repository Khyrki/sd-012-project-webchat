const socket = window.io();
const users = require('./user');
const message = require('./message');


const sendButton = document.getElementById('send');
const inputMessage = document.getElementById('message');

const chat = document.querySelector('.chat');

function createDiv(value, testId = null) {
  const div = document.createElement('div');

  if (testId !== null) {
    div.setAttribute('data-testid', testId);
  }

  div.innerText = value;
  return div;
}

function getInput(target) {
  if (target.type === 'text') {
    return target;
  }

  return target.previousElementSibling;
}

function insertDiv(text, element, testId) {
  const div = createDiv(text, testId);
  element.appendChild(div);
}

function sendEvent(id, value) {
  const socketEvents = {
    user() {
      socket.emit('userAdd', value);
    },

    message() {
      socket.send(value);
    },
  };

  const emitEvent = socketEvents[id];
  emitEvent();
}

function onInputEvent({ target, key }, element, testId) {
  if (!key || key === 'Enter') {
    const inputElement = getInput(target);
    const { id, value } = inputElement;
    inputElement.value = '';

    insertDiv(value, element, testId);
    sendEvent(id, value);
  }
}

function onUser(event) {
  onInputEvent(event, users, 'online-user');
}

function onMessage(event) {
  onInputEvent(event, chat, 'message');
}

inputName.addEventListener('keypress', onUser);
saveButton.addEventListener('click', onUser);

inputMessage.addEventListener('keypress', onMessage);
sendButton.addEventListener('click', onMessage);

socket.on('serverMessage', (nickname) => {
  const div = createDiv(nickname, 'online-user');
  insertDiv(nickname, users, 'online-user');
});

socket.on('message', (message) => {
  insertDiv(`${}, ${message}`, chat, 'message');
});
