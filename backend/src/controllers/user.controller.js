const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');
var faker = require('faker');
const { getRedisClient } = require('../redis');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const seedUsers = catchAsync(async (req, res) => {
  const qty = req.body.qty;
  for (let i = 0; i < qty; i++) {
    const payload = {
      "name": faker.name.findName(),
      "email": faker.internet.email(),
      "password": "Aa!" + faker.internet.password(),
      "role": "user"
    };
    console.log(i);
    await userService.createUser(payload);
  }
  res.status(httpStatus.CREATED).send(`Created ${qty} users`);
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

const getUsersCached = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const redisClient = getRedisClient();
  if (redisClient.connected && Object.keys(filter).length === 0) {
    redisClient.get("users", async (err, users)=> {
      if (err) {
        res.json({
            status: "error",
            message: err,
        });
      }
      if (users != null) {
        console.log("[Redis] Cache Hit");
        res.send(JSON.parse(users));
      } else {
        console.log("[Redis] Cache Miss 1");
        const result = await userService.queryUsers(filter, options);
        redisClient.setex("users", 30, JSON.stringify(result));
        res.send(result);
      }
    })
  } else {
    console.log("[Redis] Cache Miss 2");
    const result = await userService.queryUsers(filter, options);
    res.send(result);
  }
});


const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createUser,
  getUsers,
  getUsersCached,
  getUser,
  updateUser,
  deleteUser,
  seedUsers,
};
