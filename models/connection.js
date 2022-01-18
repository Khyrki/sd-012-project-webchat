const { MongoClient } = require('mongodb');

const { DB_URL, DB_NAME } = process.env;

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let connection = null;

module.exports = async () => {
  if (!connection) {
    connection = (await MongoClient.connect(
      DB_URL,
      OPTIONS,
    )).db(DB_NAME);
  }

  return connection;
};
