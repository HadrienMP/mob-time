let sound = require("./sound");
let display = require("./display");
let countDownMode = require("./countDownMode");
let mobTimer = require("./mobTimer");

const minutesByPerson = document.getElementById("minutes-by-person");

let mobInProgress = false;
setInterval(function () {
    mobTimer.passTimeLeftTo(function (timeLeft) {
        if (timeLeft === 0 && mobInProgress === true) {
            sound.play();
            countDownMode.turnOff();
            mobInProgress = false;
        } else if (timeLeft > 0  && mobInProgress === false) {
            sound.pick();
            countDownMode.turnOn();
            mobInProgress = true;
        }
        display.displayTimeLeft(timeLeft);
    });
}, 100);

// --------------------------------------------
// Setup
// --------------------------------------------

document.forms.container.onsubmit = function (event) {
    event.preventDefault();
    mobTimer.startMobTurn(minutesByPerson.value, display.displayTimeLeft);
};