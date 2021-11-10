const redis = require('redis');
const config = require('./config/config');

let redisClient = null;

const getRedisClient = () => {
  if (redisClient === null) {
    redisClient = redis.createClient(config.redisUrl);
    redisClient.on('connect', function () {
        console.log('redis connected');
        console.log(`connected ${redisClient.connected}`);
    }).on('error', function (error) {
        console.log(error);
    });
  }
  return redisClient;
};

const closeRedisClient = () => {
  if (redisClient === null) {
    return;
  }
  redisClient.quit();
};

module.exports = {
  getRedisClient,
  closeRedisClient,
};
