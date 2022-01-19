const crypto = require('crypto');

const generate16Char = () => crypto.randomBytes(8).toString('hex');

module.exports = generate16Char;
