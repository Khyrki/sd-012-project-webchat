const { WEBCHAT } = require('../../utils/strings');
const { searchAll } = require('../../models')(WEBCHAT);

module.exports = async () => searchAll();