const { WEBCHAT } = require('../../utils/strings');
const { create, searchById } = require('../../models')(WEBCHAT);

module.exports = async (message, nickname, timestamp) => {
  const { insertedId } = await create({ message, nickname, timestamp });

  const created = await searchById(insertedId);

  return created;
};
