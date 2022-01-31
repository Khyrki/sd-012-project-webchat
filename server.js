const express = require('express');

const app = express();

// Importa o método resolve() do pacote path do Node.js (https://nodejs.org/api/path.html#pathresolvepaths)
const { resolve } = require('path');

// O cors  é um recurso para utilizar a origem cruzada (front e back end) da aplicação e seus métodos permitidos
const cors = require('cors');

const PORT = 3000;

const http = require('http').createServer(app); // criando um servidor http
const io = require('socket.io')(http, { // usando o servidor pra poder rodar o socket.io
  cors: { // objeto de configuração do cors
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
});

// faz a importação do io que cria a conexão feita através do método createServer()
require('./sockets/socket')(io);

// Essa linha está informando ao app para usar a pasta 'public' para arquivos estáticos. O __dirname informa o caminho absoluto do diretório que contém o arquivo em execução no momento. 
app.use(express.static(resolve(__dirname, 'public')));

// Na rota / o arquivo a ser renderizado será o 'index.html' que está dentro do diretório 'public'
app.use('/', (_req, res) => {
  res.sendFile(resolve(__dirname, 'public', 'index.html'));
});

// Permite a troca de JSON no campo da solicitação, simplificando a comunicação cliente-servidor
app.use(express.json());
app.use(cors());

http.listen(PORT, console.log(`Socket.io escutando na porta ${PORT}!`));