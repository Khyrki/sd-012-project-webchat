const { MESSAGES } = require('../../utils/strings');
const { remove } = require('../../models')(MESSAGES);

module.exports = async (id) => remove(id);
