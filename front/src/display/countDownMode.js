const events = require("../events").events;
const container = document.getElementById("container");

document.addEventListener(events.TURN_ENDED, turnOff);
document.addEventListener(events.TURN_INTERRUPTED, turnOff);
document.addEventListener(events.TURN_STARTED, turnOn);

function turnOn() {
    container.classList.remove("counting");
    container.classList.add("counting");
}

function turnOff() {
    container.classList.remove("counting");
}