const express = require('express');

const messageRouter = require('./message');
const rootController = require('../controllers/root');

const root = express.Router({ mergeParams: true });

root.use('/message', messageRouter);
root.get('/', rootController);

module.exports = root;
