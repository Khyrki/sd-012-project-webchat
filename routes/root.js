const express = require('express');
const getMessages = require('../controllers/chatControllers');

const root = express.Router({ mergeParams: true });

root.get('/', getMessages);

module.exports = root;