const allSettings = require("../mob/settings");
const store = require("../stores/stores").get();
const Pomodoro = require("./Pomodoro");
const Off = require("./Off");

function toPomodoroName(name) {
    return `${name}-pomodoro`;
}

exports.findBy = async function (name) {
    if (await isPomodoroOff(name)) return new Off();
    let pomodoroName = toPomodoroName(name);
    let json = await store.get(pomodoroName);
    let raw = JSON.parse(json);
    if (!raw) return null;
    return new Pomodoro(new Date(raw.start), raw.length);
}

exports.contains = async name => await this.findBy(name) !== null;

async function isPomodoroOff(name) {
    let settings = await allSettings.get(name);
    return !settings.pomodoro.active;
}

exports.save = function (name, pomodoro) {
    store.save(toPomodoroName(name), JSON.stringify({
        formatVersion: 1,
        start: pomodoro.start,
        length: pomodoro.length
    }));
}