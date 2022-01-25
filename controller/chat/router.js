const express = require('express');
const message = require('./getHistory');
// const renderPage = require('./renderPage');

const router = express.Router({ mergeParams: true });

router.get('/', message);
// router.get('/', );

module.exports = router;
