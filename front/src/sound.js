let settings = require("./spi/settings");
const events = require("./events").events;
const alarm = document.getElementById("alarm-sound");
const volume = document.getElementById("volume");
const alarmUrl = document.getElementById("alarm-url");

export function init() {
    volume.value = settings.volume();
    alarm.volume = toAudioVolume(volume.value);
    let musics = settings.musics();
    if (musics) {
        alarmUrl.value = musics;
    }

    volume.oninput = function() {
        alarm.volume = toAudioVolume(this.value);
        settings.saveVolume(this.value);
    };
    alarmUrl.onchange = function() {
        settings.saveMusics(this.value);
    };
}

document.addEventListener(events.TURN_ENDED, function() {
    document.getElementById("alarm-sound").play();
});

document.addEventListener(events.TURN_STARTED, function() {
    let sounds = alarmUrl.value.trim().split("\n");
    alarm.children[0].src = sounds[Math.floor(Math.random() * sounds.length)];
    alarm.load();
});
function toAudioVolume(percent) {
    return percent / 100;
}

export function isPlaying() {
    return !alarm.paused;
}

export function stop() {
    alarm.pause();
    alarm.fastSeek(0);
}
