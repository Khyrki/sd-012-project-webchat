const { WEBCHAT } = require('../../utils/strings');
const { remove } = require('../../models')(WEBCHAT);

module.exports = async (id) => remove(id);
