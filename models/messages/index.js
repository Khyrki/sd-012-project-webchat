const create = require('./create');
const findAll = require('./findAll');

module.exports = {
    create: async (newRecipe) => create(newRecipe),
    findAll: async () => findAll(),
  };