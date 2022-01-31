const MongoDB = require('./MongoDB');

module.exports = {
  Users: new MongoDB('users'),
  Messages: new MongoDB('messages'),
};
