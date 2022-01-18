const { MongoClient } = require('mongodb');
require('dotenv').config();

const client = new MongoClient(
  process.env.DB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
);

let schema = null;

async function connection() {
  if (schema) return schema;
  schema = await (await client.connect()).db(process.env.DB_NAME);

  return schema;
}

module.exports = connection;
