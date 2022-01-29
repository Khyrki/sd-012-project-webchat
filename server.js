const express = require('express');

const app = express();
const { http, init } = require('.')(app);
const io = require('./src/sockets')(http);

app.use(express.static(`${__dirname}/src/views/`));
require('./src/sockets/chat')(io);

app.get('/', (_req, res, _next) => res.sendFile(`${__dirname}/src/views/chat.html`));

init();