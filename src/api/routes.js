const { Router } = require('express');

const router = Router();

const controller = require('../controllers');

router.get('/', controller.renderPage);

module.exports = router;
