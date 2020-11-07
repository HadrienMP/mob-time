let allSettings = require("../settings/allSettings");
let core = require("../features/core");

const legalFeatures = ["pomodoro", "fastTime", "fasterTime"];

exports.isOn = async (feature, mob) => {
    let settings = await allSettings.get(mob) || allSettings.default;
    return core.isOn(feature, process.env.FEATURES, settings.features);
}

exports.activate = async (features, mob) => {
    let settings = await allSettings.get(mob) || allSettings.default;
    settings.features = core.activate(features, settings.features, legalFeatures);

    await allSettings.save(mob, settings);
}