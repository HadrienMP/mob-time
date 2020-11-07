const sound = require("./sound");
const display = require("./display/display");
require("./display/countDownMode");
const amplitude = require("./amplitude,").get();
const mobTimer = require("./spi/mobTimer");
const eventsModule = require("./events");
const settings = require("./settings");
const turn = require("./mob/turn");
const pomodoro = require("./pomodoro/countdown");

mobTimer.timeLeftIn(mobName, update);
setInterval(() => mobTimer.timeLeftIn(mobName, update), 100);

function update(timerStatus) {
    eventsModule.throwEventFor(timerStatus, turn.isInProgress());
    display.displayTimeLeft(timerStatus);
}

// --------------------------------------------
// Sockets
// --------------------------------------------
let socket = io();
socket.emit("join", mobName);

// --------------------------------------------
// Setup
// --------------------------------------------
sound.init();
display.init();
document.forms.container.onsubmit = function (event) {
    event.preventDefault();
    if (turn.isInProgress()) {
        amplitude.getInstance().logEvent('STOP_MOB');
        socket.emit("interrupt mob", mobName);
        return;
    }
    if (sound.isPlaying()) {
        sound.stop();
        amplitude.getInstance().logEvent('STOP_SOUND');
        return;
    }
    socket.emit("start mob", mobName, settings.minutesByPerson());
    amplitude.getInstance().logEvent('START_MOB');
};

new ClipboardJS("#share-room", {
    text: () => window.location.href
}).on('success', () => {
    alert('A link to this mob has been copied in your clipboard');
});

pomodoro.setup();
require("./pomodoro/settings").setup(socket, mobName);
settings.setupSync(socket, mobName);