exports.get = () => process.env.REDIS_URL === undefined
                    ? require("./local_storage")
                    : require("./redis");