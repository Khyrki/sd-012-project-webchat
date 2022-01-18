const socket = window.io();

const webchatForm = document.querySelector('.webchat-form');
const input = document.querySelector('.input-message');

const submitForm = (event) => {
  event.preventDefault();

  socket.emit('message', {
    chatMessage: input.value,
  });

  input.value = '';

  return false;
};

webchatForm.addEventListener('submit', (event) => submitForm(event));

const createNewMessage = (message) => {
  const webchatMessages = document.querySelector('.webchat-messages');
  const textMessageFrom = `${message.date} - ${message.nickname}`;

  const messageFrom = document.createElement('strong');
  messageFrom.innerText = `${textMessageFrom}:`;

  const messageContent = document.createElement('p');
  messageContent.innerText = message.chatMessage;

  const displayedMessage = document.createElement('div');
  displayedMessage.className = 'displayed-message';
  displayedMessage.append(messageFrom, messageContent);

  webchatMessages.appendChild(displayedMessage);
};

socket.on('serverMsg', (message) => createNewMessage(message));