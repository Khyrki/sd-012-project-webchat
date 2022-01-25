const socket = window.io();

const messageForm = document.querySelector('#messageForm');
const inputMessage = document.querySelector('#messageInput');
const nicknameForm = document.querySelector('#nicknameForm');
const inputNickname = document.querySelector('#nicknameInput');
const nicknamesContainer = document.querySelector('#nicknamesContainer');

const DATA_TEST_LABEL = 'data-testid';

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nickname = sessionStorage.getItem('nickname');
    socket.emit('message', { chatMessage: inputMessage.value, nickname });
    inputMessage.value = '';
    return false;
});

nicknameForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newNickname = inputNickname.value;
    sessionStorage.setItem('nickname', newNickname);
    inputNickname.value = '';
    socket.emit('changeNickname', newNickname);
    return false;
});

const sendMessage = (message) => {
    const chatMessages = document.querySelector('#chatMessages');
    const li = document.createElement('li');
    li.setAttribute(DATA_TEST_LABEL, 'message');
    li.innerText = message;
    chatMessages.appendChild(li);
};

const renderNicknames = ({ nickname, id }) => {
    const li = document.createElement('li');
    li.setAttribute(DATA_TEST_LABEL, 'online-user');
    li.setAttribute('id', id);
    li.innerText = nickname;
    nicknamesContainer.appendChild(li);
};

socket.on('message', (message) => sendMessage(message));

socket.on('clientsChange', (clients) => {
    const sortedClients = [clients.find((client) => client.id === socket.id),
        ...clients.filter((client) => client.id !== socket.id)];
    const { nickname } = clients.find((client) => client.id === socket.id);
    sessionStorage.setItem('nickname', nickname);
    nicknamesContainer.innerHTML = '';
    sortedClients.forEach(renderNicknames);
});

window.onbeforeunload = (_event) => {
    socket.disconnect();
};