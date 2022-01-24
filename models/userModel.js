const { ObjectId } = require('mongodb');
const connection = require('./connection');

const userModel = {
  async users() {
    return (await connection()).collection('users');
  },

  async list() {
    return (await this.users()).find();
  },

  async find(_id) {
    return (await this.users()).find({ _id: ObjectId(_id) });
  },

  async delete(_id) {
    return (await this.users()).deleteOne({ _id: ObjectId(_id) });
  },

  async create(_id, nickname) {
    return (await this.users()).insertOne({ _id, nickname });
  },

  async update(_id, nickname) {
    return (await this.users()).updateOne(
      { _id: ObjectId(_id) },
      {
        $set: {
          nickname,
        },
      },
    );
  },
};

module.exports = userModel;
