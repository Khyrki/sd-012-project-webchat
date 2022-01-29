const express = require('express');

const app = express();
const { http, init } = require('.')(app);
const io = require('./src/sockets')(http);

require('./src/sockets/connection')(io);

app.use(express.static(`${__dirname}/src/views/chat.html`));

app.get('/', (_req, res, _next) => res.sendFile(`${__dirname}/src/views/chat.html`));

init();