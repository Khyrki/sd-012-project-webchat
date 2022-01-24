const { ObjectId } = require('mongodb');
const connection = require('./connection');

const messageModel = {
  async messages() {
    return (await connection()).collection('messages');
  },

  async list() {
    return (await this.messages()).find();
  },

  async find(_id) {
    return (await this.messages()).find({ _id: ObjectId(_id) });
  },

  async delete(_id) {
    return (await this.messages()).deleteOne({ _id: ObjectId(_id) });
  },

  async create(_id, nickname) {
    return (await this.messages()).insertOne({ _id, nickname });
  },

  async update(_id, nickname) {
    return (await this.messages()).updateOne(
      { _id: ObjectId(_id) },
      {
        $set: {
          nickname,
        },
      },
    );
  },
};

module.exports = messageModel;
