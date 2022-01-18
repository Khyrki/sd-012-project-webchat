const express = require('express');

const messages = require('./messages');

const root = express.Router({ mergeParams: true });

root.use('/webchat', messages);

module.exports = root;
