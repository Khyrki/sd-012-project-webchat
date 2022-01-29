const socket = window.io();

const aliasTeste = 'data-testid';

const nicknameInput = document.getElementById('nicknameInput');
const nicknameButton = document.getElementById('nicknameButton');
const msgInput = document.getElementById('msgInput');
const msgButton = document.getElementById('msgButton');

let userNick = '';

msgButton.addEventListener('click', (event) => {
    event.preventDefault();
    const nickname = userNick || socket.id.slice(0, 16);
    socket.emit('message', { chatMessage: msgInput.value, nickname });
    msgInput.value = '';
});

const msgUser = (message) => {
    const messge = document.getElementById('userMsgs');
    const oneLi = document.createElement('oneLi');
    oneLi.innerText = message;
    oneLi.setAttribute(aliasTeste, 'message');
    messge.appendChild(oneLi);
};

nicknameButton.addEventListener('click', (event) => {
    event.preventDefault();
    userNick = nicknameInput.value;
    if (userNick !== '') {
        socket.emit('newUser', userNick);
        nicknameInput.value = '';
    }
});

const names = (onUser) => {
    const newUserNickname = socket.id.slice(0, 16);
    const user = document.getElementById('conUsers');
    user.innerHTML = '';
    onUser.forEach((element) => {
        const oneLi = document.createElement('oneLi');
        oneLi.setAttribute(aliasTeste, 'online-user');
        oneLi.innerText = element;
        if (element === onUser || element === newUserNickname) {
            return user.prepend(oneLi);
        }
            user.appendChild(oneLi);
    });
};

const DbMsg = (userMsgs) => {
    userMsgs.forEach(({ time, nickname, chatMessage }) => {
      const messageL = document.getElementById('userMsgs');
      const oneLi = document.createElement('oneLi');
      oneLi.innerText = `${time} - ${nickname} : ${chatMessage}`;
      oneLi.setAttribute(aliasTeste, 'message');
      messageL.appendChild(oneLi);
    });
  };
  
  socket.on('modelMsg', (userMsgs) => DbMsg(userMsgs));

socket.on('message', (chatMessage) => msgUser(chatMessage));

socket.on('names', (onUser) => names(onUser)); 