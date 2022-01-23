const { MESSAGES } = require('../../utils/strings');
const { searchAll } = require('../../models')(MESSAGES);

module.exports = async () => searchAll();