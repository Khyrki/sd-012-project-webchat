// ------------------------------ MODELS ------------------------------------
const create = require('./create');
const list = require('./list');

module.exports = {
  create: (collection, entity) => create(collection, entity),
  list: (collection) => list(collection),
};