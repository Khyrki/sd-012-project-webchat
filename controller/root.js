const express = require('express');
const chat = require('./chat/router');

const root = express.Router({ mergeParams: true });

root.use('/', chat);

module.exports = root;
