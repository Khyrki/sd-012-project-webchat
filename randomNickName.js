const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');

module.exports.randomName = () => {
  const random = uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] });
  return random.substring(0, 16);
};
