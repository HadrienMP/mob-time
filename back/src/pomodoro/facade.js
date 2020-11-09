const crate = require("./crate");
const Pomodoro = require("./Pomodoro");
const Off = require("./Off");
const allSettings = require("../settings/allSettings");
const features = require("../features/facade");

class FeatureToggle {
    constructor() {
        this.on = new FeatureOn()
        this.off = new FeatureOff()
    }

    async status(name) {
        return this.feature(name).status(name);
    }

    async turnStarted(name, turn) {
        return this.feature(name).turnStarted(name, turn);
    }

    feature(name) {
        return features.isOn("pomodoro", name) ? this.on : this.off;
    }
}

class FeatureOn {
    async status(name) {
        let pomodoro = await crate.findBy(name) || new Off();
        return pomodoro.status();
    }

    async turnStarted(name, turn) {
        let lastPomodoro = await crate.findBy(name);
        if (lastPomodoro !== null && lastPomodoro.inProgress()) return;
        let pomodoro = new Pomodoro(turn.startTime, await this.length(name, turn));
        crate.save(name, pomodoro);
    }

    async length(name, turn) {
        let settings = await allSettings.get(name);
        return turn.lengthInSeconds * settings.pomodoro.turns / 60;
    }

    async stop(name) {
        crate.delete(name); 
    }
}

class FeatureOff {
    async status() {
        return null;
    }

    async turnStarted() {
    }
    async stop() {}
}

const featureToggle = new FeatureToggle();

exports.get = function () {
    return featureToggle;
};
