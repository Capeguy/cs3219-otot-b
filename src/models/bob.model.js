const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const bobSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
bobSchema.plugin(toJSON);
bobSchema.plugin(paginate);

/**
 * Check if name is taken
 * @param {string} name - The Bob's name
 * @param {ObjectId} [excludeBobId] - The id of the bob to be excluded
 * @returns {Promise<boolean>}
 */
 bobSchema.statics.isNameTaken = async function (name, excludeBobId) {
  const bob = await this.findOne({ name, _id: { $ne: excludeBobId } });
  return !!bob;
};

/**
 * @typedef Bob
 */
const Bob = mongoose.model('Bob', bobSchema);

module.exports = Bob;
