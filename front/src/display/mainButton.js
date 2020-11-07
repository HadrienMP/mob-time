const sound = require("../sound");
const circleAnimation = require("../circle-animation");
const circle = document.getElementById("countdown-circle");
const dasharray = circleAnimation.dasharray(circle);

export function update(timerStatus, timeFormatter) {
    icon(timerStatus);
    timeLeft(timeFormatter, timerStatus);
    circleAnimation.progression(circle, ratio(timerStatus), dasharray);
}
function icon(timerStatus) {
    let controls = document.getElementById("control-icons");
    controls.className = iconClass(timerStatus.timeLeftInMillis);
}
function iconClass(time) {
    if (sound.isPlaying()) {
        return "fas fa-volume-mute";
    }
    if (time === 0) {
        return "fas fa-play";
    }
    return "fas fa-stop";
}
function timeLeft(timeFormatter, timerStatus) {
    let timeLeft = document.getElementById("time-left");
    timeLeft.innerText = timeFormatter(timerStatus.timeLeftInMillis);
}

function ratio(timerStatus) {
    if (timerStatus.lengthInMinutes === 0) return 0;
    return timerStatus.timeLeftInMillis / (timerStatus.lengthInMinutes * 60 * 1000);
}
