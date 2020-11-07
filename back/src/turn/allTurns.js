const MobTurn = require("./Turn");
const store = require("../stores/stores").get();

exports.get = async name => {
    let json = await store.get(toTurnName(name));
    if (json == null) return new MobTurn();
    let data = JSON.parse(json);
    return new MobTurn(data.lengthInSeconds, new Date(data.startTime));
};

exports.start = (name, lengthInMinutes) => {
    let mobTurn = new MobTurn(lengthInMinutes * 60);
    store.save(toTurnName(name), JSON.stringify(mobTurn));
    return mobTurn;
};

function toTurnName(name) {
    return name + "-turn";
}
exports.stop = name => store.delete(toTurnName(name));
