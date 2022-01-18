const express = require('express');

const rootController = require('../controllers/root');

const root = express.Router({ mergeParams: true });

root.get('/', rootController);

module.exports = root;
