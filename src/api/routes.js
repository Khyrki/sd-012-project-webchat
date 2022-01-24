const { Router } = require('express');

const router = Router();

const controller = require('../controllers');

router.get('/', controller.renderPage);

// router.post('/send', controller.sendMessage);

module.exports = router;
