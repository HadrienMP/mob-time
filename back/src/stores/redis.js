const {promisify} = require('util');
const redis = require('redis');
const client = redis.createClient(process.env.REDIS_URL);
const getAsync = promisify(client.get).bind(client);

console.log("chose redis: " + process.env.REDIS_URL);

client.on("error", function (err) {
    console.log("Error " + err);
});

exports.get = async name => await getAsync(name);
exports.save = (name, turn) => client.set(name, turn, redis.print);
exports.delete = name => client.del(name);