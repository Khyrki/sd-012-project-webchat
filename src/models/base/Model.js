const { ObjectId } = require('mongodb');
const connection = require('./connection');

class Model {
  constructor(collection) {
    this.db = connection;
    this.collection = collection;
  }

  async getCollection() {
    const db = await this.db();
    return db.collection(this.collection);
  }

  async create(document) {
    const collection = await this.getCollection();
    await collection.insertOne(document);
    const { _id: id, ...rest } = document;
    return { id, ...rest };
  }

  async find() {
    const collection = await this.getCollection();
    const documents = await collection.find().toArray();
    return documents.map(({ _id: id, ...rest }) => ({ id, ...rest }));
  }

  async findById(id) {
    if (!ObjectId.isValid(id)) return null;

    const collection = await this.getCollection();
    const document = await collection.findOne({ _id: new ObjectId(id) });

    if (!document) return null;

    const { _id, ...rest } = document;
    return { id, rest };
  }

  async update(id, document) {
    if (!ObjectId.isValid(id)) return null;

    const collection = await this.getCollection();
    const oldDoc = await collection.findAndUpdateOne(
      {
        _id: new ObjectId(id),
      },
      { 
        $set: document,
      },
      {
        returnOriginal: true,
      },
    );

    if (!oldDoc) return null;

    return { id, ...document };
  }

  async delete(id) {
    if (!ObjectId.isValid(id)) return null;

    const collection = await this.getCollection();
    const document = await this.findById(id);

    if (!document) return null;

    await collection.deleteOne(
      { _id: new ObjectId(id) },
    );

    return document;
  }
}

module.exports = Model;
