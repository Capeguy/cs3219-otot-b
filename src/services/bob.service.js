const httpStatus = require('http-status');
const { Bob } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a Bob
 * @param {Object} BobBody
 * @returns {Promise<Bob>}
 */
const createBob = async (BobBody) => {
  if (await Bob.isNameTaken(BobBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken');
  }
  return Bob.create(BobBody);
};

/**
 * Query for Bobs
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryBobs = async (filter, options) => {
  const Bobs = await Bob.paginate(filter, options);
  return Bobs;
};

/**
 * Get Bob by id
 * @param {ObjectId} id
 * @returns {Promise<Bob>}
 */
const getBobById = async (id) => {
  return Bob.findById(id);
};

/**
 * Get Bob by email
 * @param {string} email
 * @returns {Promise<Bob>}
 */
const getBobByEmail = async (email) => {
  return Bob.findOne({ email });
};

/**
 * Update Bob by id
 * @param {ObjectId} BobId
 * @param {Object} updateBody
 * @returns {Promise<Bob>}
 */
const updateBobById = async (BobId, updateBody) => {
  const bob = await getBobById(BobId);
  if (!bob) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Bob not found');
  }
  if (updateBody.name && (await Bob.isNameTaken(updateBody.name, BobId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken');
  }
  Object.assign(bob, updateBody);
  await bob.save();
  return bob;
};

/**
 * Delete Bob by id
 * @param {ObjectId} BobId
 * @returns {Promise<Bob>}
 */
const deleteBobById = async (BobId) => {
  const bob = await getBobById(BobId);
  if (!bob) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Bob not found');
  }
  await bob.remove();
  return bob;
};

module.exports = {
  createBob,
  queryBobs,
  getBobById,
  getBobByEmail,
  updateBobById,
  deleteBobById,
};
