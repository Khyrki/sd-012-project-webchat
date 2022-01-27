const socket = window.io();

const messagesForm = document.querySelector('#messages-form');
const messagesInput = document.querySelector('#messages-input');

const nicknameForm = document.querySelector('#nickname-form');
const nicknameInput = document.querySelector('#nickname-box');
const showNickname = document.querySelector('#online-user');

function createRandomNickname() {
  let randomNickname = '';
  const size = 16;
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let index = 0; index < size; index += 1) {
    randomNickname += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return randomNickname;
}
// referencia: https://www.webtutorial.com.br/funcao-para-gerar-uma-string-aleatoria-random-com-caracteres-especificos-em-javascript/
showNickname.innerHTML = sessionStorage.getItem('nickname') || createRandomNickname();

nicknameForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const newNickname = nicknameInput.value;
  nicknameInput.value = '';

  sessionStorage.setItem('nickname', newNickname);
  showNickname.innerText = newNickname;
});

messagesForm.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('message', messagesInput.value);
  messagesInput.value = '';
  return false;
});

const createMessageList = (message) => {
  const ul = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerText = message;
  li.setAttribute('data-testid', 'message');
  ul.appendChild(li);
};

socket.on('message', (message) => createMessageList(message));
