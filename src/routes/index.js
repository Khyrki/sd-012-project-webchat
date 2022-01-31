const { Router } = require('express');
const controller = require('../controllers/chat');

const router = Router();

router.get('/', controller.renderChat);

module.exports = router;
