const socket = window.io();

const nickNameDisplayer = document.getElementById('userNickname');

const setNickname = (nickName) => {
  nickNameDisplayer.innerText = nickName;
};

socket.on('newConnection', (socketId) => {
  const sixteenCarachNick = socketId.substring(0, 16);

  if (sessionStorage.getItem('key')) {
    return setNickname(sessionStorage.getItem('key'));
  }

  sessionStorage.setItem('key', sixteenCarachNick);

  setNickname(sixteenCarachNick);
});