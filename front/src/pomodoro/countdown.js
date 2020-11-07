const events = require("../events").events;
const circleAnimation = require("../circle-animation");
const core = require("./core");
const circle = document.getElementById("pomodoro-circle");

let state = {breakSignaled: true};

function handle(evt) {
    state = core.handle(
        {"ratio": evt.detail.pomodoro.ratio, "turnInProgress": evt.detail.turn.active, "state": state},
        leftRatio => circleAnimation.progression(circle, leftRatio),
        () => alert("Take a break!")
    );
}

export function setup() {
    document.addEventListener(events.TURN_ENDED, handle);
    document.addEventListener(events.TIME_PASSED, handle);
}
