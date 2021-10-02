const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { bobService } = require('../services');

const createBob = catchAsync(async (req, res) => {
  const Bob = await bobService.createBob(req.body);
  res.status(httpStatus.CREATED).send(Bob);
});

const getBobs = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await bobService.queryBobs(filter, options);
  res.send(result);
});

const getBob = catchAsync(async (req, res) => {
  const Bob = await bobService.getBobById(req.params.id);
  if (!Bob) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Bob not found');
  }
  res.send(Bob);
});

const updateBob = catchAsync(async (req, res) => {
  const Bob = await bobService.updateBobById(req.params.id, req.body);
  res.send(Bob);
});

const deleteBob = catchAsync(async (req, res) => {
  await bobService.deleteBobById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createBob,
  getBobs,
  getBob,
  updateBob,
  deleteBob,
};
