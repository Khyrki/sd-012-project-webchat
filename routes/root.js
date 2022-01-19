const express = require('express');
const getAllMessages = require('../controllers/chatControllers');

const root = express.Router({ mergeParams: true });

root.get('/', getAllMessages);

module.exports = root;