const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');

const randomName = () => {
  const random = uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] });
  return random.substring(0, 16);
};

module.exports = randomName;
