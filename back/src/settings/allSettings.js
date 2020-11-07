const store = require("../stores/stores").get();
const {toSettings} = require("./settings");

exports.default = toSettings({});

// ---------------------------------------
// Length
// ---------------------------------------
exports.saveLength = async function(name, lengthInMinutes) {
    let settings = await this.get(name) || this.default;
    settings.lengthInMinutes = lengthInMinutes;
    await this.save(name, settings);
};

exports.getLength = async function (name) {
    return this.get(name).then(value => value.lengthInMinutes);
};
// ---------------------------------------

exports.save = async function(name, settings) {
    const toSave = settings || this.default;
    await store.save(toSettingsName(name), JSON.stringify(toSave));
};

exports.get = async function (name) {
    let rawJsonSettings = await store.get(toSettingsName(name));
    if (!rawJsonSettings) return null;
    if (isRawLength(rawJsonSettings)) {
        await this.saveLength(name, rawJsonSettings);
        return this.get(name);
    }
    let rawSettings = JSON.parse(rawJsonSettings);
    return toSettings(rawSettings);
};

function isRawLength(rawSettings) {
    return !rawSettings.startsWith("{");
}

function toSettingsName(name) {
    return name + "-settings";
}