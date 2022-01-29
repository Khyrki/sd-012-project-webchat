const { MongoClient } = require('mongodb');
require('dotenv').config();

const dbName = process.env.DB_NAME;
const url = process.env.DB_URL;

const client = new MongoClient(url);

module.exports = async () => {
  await client.connect();
  const db = client.db(dbName);
  return db;
};
