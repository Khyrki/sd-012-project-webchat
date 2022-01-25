const express = require('express');
const message = require('./getHistory');

const router = express.Router({ mergeParams: true });

router.get('/', message);

module.exports = router;
