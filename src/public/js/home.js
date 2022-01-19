const socketEvents = {
  nickname: 'nickname',
  message: 'message',
};

const elements = {
  nameContainer: document.getElementById('online-user'),
  messagesContainer: document.getElementById('messages'),
  messageInput: document.getElementById('message-box'),
  nicknameInput: document.getElementById('nickname-box'),
  sendButton: document.getElementById('send-button'),
  nicknameButton: document.getElementById('nickname-button'),
};

// handlers;
const changeNicknameHandler = (nickname) => {
  elements.nameContainer.innerText = nickname;
};

const createMessageHandler = (message) => {
  const li = document.createElement('li');
  li.innerText = message;
  elements.messagesContainer.appendChild(li);
  li.setAttribute('data-testid', 'message');
};

const sendMessageHandler = (socket) => {
  const message = elements.messageInput.value;
  const nickname = elements.nameContainer.innerText;

  socket(message, nickname);

  elements.messageInput.value = '';
  elements.messageInput.focus();
};

const sendNicknameHandler = (changeNameHandler) => {
  const nickname = elements.nicknameInput.value;
  changeNameHandler(nickname);

  elements.nicknameInput.value = '';
  elements.nicknameInput.focus();
};

// sockets;
const getNicknameSocket = (socket) => (callback) => {
  socket.on(socketEvents.nickname, ({ nickname }) => {
    callback(nickname);
  });
};

const sendMessageSocket = (socket) => (message, nickname) => {
  socket.emit(
    socketEvents.message,
    { chatMessage: message, nickname },
  );
};

const getMessageSocket = (socket) => (callback) => {
  socket.on(socketEvents.message, (message) => {
    callback(message);
  });
};

const getSockets = (socket) => ({
  getNickname: getNicknameSocket(socket),
  sendMessage: sendMessageSocket(socket),
  getMessage: getMessageSocket(socket),
});

// events;
const sendMessageEvent = (handler, socket) => {
  elements.sendButton.addEventListener('click', (e) => {
    e.preventDefault();
    handler(socket);
  });
};

const changeNameEvent = (sendNameHandler, changeNameHandler) => {
  elements.nicknameButton.addEventListener('click', (e) => {
    e.preventDefault(); 
    sendNameHandler(changeNameHandler);
  });
};

// === MAIN === //
function main() {
  const socket = window.io();
  const sockets = getSockets(socket);

  sockets.getNickname(changeNicknameHandler);
  changeNameEvent(sendNicknameHandler, changeNicknameHandler);
  sendMessageEvent(sendMessageHandler, sockets.sendMessage);
  sockets.getMessage(createMessageHandler);
}

main();
