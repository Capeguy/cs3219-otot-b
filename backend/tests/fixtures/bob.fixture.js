const mongoose = require('mongoose');
const faker = require('faker');
const Bob = require('../../src/models/bob.model');

const bobOne = {
  _id: mongoose.Types.ObjectId(),
  name: faker.name.findName(),
};

const bobTwo = {
  _id: mongoose.Types.ObjectId(),
  name: faker.name.findName(),
};

const insertBobs = async (bobs) => {
  await Bob.insertMany(bobs.map((bob) => ({ ...bob })));
};

module.exports = {
  bobOne,
  bobTwo,
  insertBobs,
};
