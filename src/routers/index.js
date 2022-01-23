const { Router } = require('express');
const chat = require('../controllers/chat');

const router = Router();

router.get('/', chat);

module.exports = router;
