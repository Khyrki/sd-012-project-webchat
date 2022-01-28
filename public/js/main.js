const socket = window.io();

const formMsg = document.querySelector('form');
const inputMsg = document.querySelector('.inputMsg');

formMsg.addEventListener('submit', (e) => {
  e.preventDefault();
  const nick = 'provisório';
  const message = inputMsg.value;
  socket.emit('message', { nick, message });
  inputMsg.value = '';
  return false;
});

const createMessage = (message) => {
  const listOfMsg = document.querySelector('.messages');
  const oneLi = document.createElement('oneLi');
  oneLi.innerText = message;
  listOfMsg.appendChild(oneLi);
};

socket.on('message', (message) => { 
  createMessage(message);
}); 