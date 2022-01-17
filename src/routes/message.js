const express = require('express');

const messageController = require('../controllers/message');

const router = express.Router({ mergeParams: true });

router.post('/create', messageController.create);

module.exports = router;
