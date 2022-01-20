const { Router } = require('express');
const getChat = require('../controllers/getChat');

const router = Router();

router.get('/', getChat);

module.exports = router;