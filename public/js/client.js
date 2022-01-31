// chama o método io do socket
const socket = window.io();

// ul onde será renderizada a lista de usuários conectados
const connectedUsers = document.getElementById('users');

// ul onde será renderizado o histórico de mensagens dos usuários
const usersMessages = document.getElementById('messages');

// form que o usuário irá interagir com o chat
const messageForm = document.getElementById('form');

// input para o usuário atualizar o seu nickname
const nicknameBox = document.getElementById('nickname-box');

// button para que o usuário salve seu nickname atualizado
const saveNickname = document.getElementById('nickname-button');

// input para que o usuário digite sua mensagem
const messageBox = document.getElementById('message-box');

let nickname = '';

// Req. 1 - Emite o evento mensagem com os dados do nickname e a mensagem digitada no campo messageBox
messageForm.addEventListener('submit', (event) => {
  // Previne a página de se recarregar ao clicar no botão
  event.preventDefault();
  socket.emit('message', {
    nickname,
    chatMessage: messageBox.value,
  });
  // Reseta o valor do input messageBox
  messageBox.value = '';
});

// Req. 2 - Permite salvar o nickname do usuário
saveNickname.addEventListener('click', (event) => {
  // Previne a página de se recarregar ao clicar no botão
  event.preventDefault();
  // Captura o que for digitado no input nicknameBox
  nickname = nicknameBox.value;
  // Reseta o  valor do nicknameBox
  nicknameBox.value = '';
  // Envia os dados ao back-end
  socket.emit('saveNickname', nickname);
});

// Req. 1 e 2 - Armazena a mensagem digitada numa tag li e adiciona essa tag em usersMessages (a ul do histórico de mensagens dos usuários)
const createMessage = (message) => {
  const li = document.createElement('li');
  li.innerText = message;
  li.setAttribute('data-testid', 'message');
  usersMessages.appendChild(li);
};

// Req. 3 - Recupera as mensagens salvas no banco de dados
const getMessages = (messages) => {
  // Cria as mensagens com os campos: "message", "nickname", "timestamp"
  messages.forEach((message) => {
    createMessage(
      `${message.timestamp} - ${message.nickname}: ${message.message}`,
    );
  });
};

// Req. 2 - Cria o usuário no chat, conforme o id gerado com 16 caracteres
const userCreated = (newId) => {
  // O nickname aleatório é o id que foi gerado com 16 caracteres
  nickname = newId;
  // Req. 4 - enviando para o back-end os usuários que estão online
  socket.emit('usersOnline');
};

// Req. 4 - Função que atualiza os usuários
const updateUserNickname = (user) => {
  const li = document.createElement('li');
  // Cada usuário irá aparecer na li criada
  li.innerText = user.nickname;
  li.setAttribute('data-testid', 'online-user');
  // Adiciona a nova tag ao html
  connectedUsers.appendChild(li);
};

// Req. 4 - lista os clientes conectados no momento
const getUsersOnline = (users) => {
  // Enquanto não houver um novo usuário, a tag "connecteUsers" será vazia
  connectedUsers.innerHTML = '';
  // Procurar pelo usuário conectado comparando o id com o id do socket
  const user = users.find((el) => el.id === socket.id);
  // Sendo o id correspondente, atualiza a tag com o nome do usuário chamando a função anterior
  updateUserNickname(user);
  // Se o usuário já foi atualizado, ele não irá atualizar com o nome já preenchido
  users.forEach((el) => el.id !== socket.id && updateUserNickname(el));
};

// Req.1 - ouvindo o evento 'message' e executando a função createMessage
socket.on('message', createMessage);

// Req. 2 - ouvindo o evento 'newUser' (novos usuários que entraram no chat) e executando a função userCreated
socket.on('newUser', userCreated);

// Req. 3 - ouvindo o evento 'allMessages' e executando a função getMessages
socket.on('allMessages', getMessages);

// Req. 4 - ouvindo o 'usersOnline' e executando a função que pega todos os usuários online no momento
socket.on('usersOnline', getUsersOnline);