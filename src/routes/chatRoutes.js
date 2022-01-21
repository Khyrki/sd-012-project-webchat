const express = require('express');
const { chatController } = require('../controllers/chatControllers');

const chat = express.Router();

chat.get('/', chatController);

module.exports = { chat };