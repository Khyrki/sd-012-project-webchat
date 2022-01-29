const { MongoClient } = require('mongodb');
require('dotenv').config();

const { DB_URL, DB_NAME } = process.env;

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const db = null;

const connection = () => (db
  ? Promise.resolve(db)
  : MongoClient.connect(DB_URL, OPTIONS)
  .then((conn) => conn.db(DB_NAME)));

module.exports = connection;
