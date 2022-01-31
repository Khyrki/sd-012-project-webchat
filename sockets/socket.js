// O Moment.js é um pacote utilizado para validar, manipular e fazer o parse de datas no JavaScript. Ele será usado para formatar o timeStamps das mensagens
const moment = require('moment');
const messagesModel = require('../models/messagesModel');

// Req. 4 - array criado para armazenar os usuários conectados
const online = [];

// Req. 2 - função para gerar um usuário com 16 caracteres, utilizando o próprio "id" gerado pelo socket
const createUser = (socket) => {
  const { id } = socket;
  // O newId sera uma substring de 16 caracteres do id gerado automaticamento pelo socket
  const newId = id.slice(0, 16);
  // Insere o usuário conectado com o id do socket e o nickname com o novo id gerado na linha 12 no array de usuários online
  online.push({ id, nickname: newId });
  // Emite para o front-end que o novo client está conectado
  socket.emit('newUser', newId);
};

// Req. 1 - a mensagem será formatada conforme o requisito
const newMessage = (socket, io) => {
  const timestamp = moment().format('DD-MM-yyyy hh:mm:ss A');
  // Ouvindo a mensagem digitada pelo usuário e executa a função abaixo
  socket.on('message', async (message) => {
    io.emit('message', `${timestamp} - ${message.nickname}: ${message.chatMessage}`);
    // Criando a mensagem e armazenando no banco de dados
    await messagesModel.createMessage(message.nickname, message.chatMessage, timestamp);
  });
};

// Req. 3 - buscando as mensagens no banco de dados
const getMessages = async (socket) => {
  const messages = await messagesModel.getAllMessages();
  // Emite as mensagens para todos os usuários online no chat
  socket.emit('allMessages', messages);
};

// Req. 2 - ao salvar o nickname, ele é atualizado pra todos conectados no chat
const saveNickname = async (socket, io) => {
  // Ouvindo o usuário salvo
  socket.on('saveNickname', (nickname) => {
    // Procura no array e verificar se o id do usuário corresponde ao id do socket, ele retorna o primeiro índice que corresponde
    const userIndex = online.findIndex((user) => user.id === socket.id);
    // Encontrando o id correspondente ele acessa o nickname e seta o nickname informado pelo usuário
    online[userIndex].nickname = nickname;
    // Emite para o cliente os usuários conectados
    io.emit('usersOnline', online);
  });
};

const usersOnline = (socket, io) => {
  // Ouve os usuários online
  socket.on('usersOnline', () => {
    // Emite para todos que estão online ao carregar o chat
    io.emit('usersOnline', online);
  });
};

// Req. 4 - mostra quem se desconectou
const disconnectUser = (socket, io) => {
  socket.on('disconnect', () => {
    const userIndex = online.findIndex((user) => user.id === socket.id);
    // Remove o cliente de acordo com o index gerado em userIndex
    online.splice(userIndex, 1);
    io.emit('usersOnline', online);
  });
};

// Exportando o arquivo para o server
module.exports = (io) => {
  // Estabelece conexão com o io e executa as funções
  io.on('connection', (socket) => {
    createUser(socket);
    newMessage(socket, io);
    getMessages(socket);
    saveNickname(socket, io);
    usersOnline(socket, io);
    disconnectUser(socket, io);
  });
};