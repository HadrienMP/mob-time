let human_readable = require("../functions/human_readable_time");
let main_button = require("./mainButton");
let settings = require("../spi/settings");
const countingMode = document.getElementById("second-counting-mode");

export function init() {
    countingMode.value = settings.displaySeconds();

    countingMode.onchange = function() {
        settings.saveDisplaySeconds(this.checked);
    };
}

export const appTitle = "Mob Time";

export function displayTimeLeft(timerStatus) {
    document.title = toPageTitle(timerStatus.timeLeftInMillis, timeFormatter());
    main_button.update(timerStatus, timeFormatter());
}

function toPageTitle(time, timeFormatter) {
    if (time === 0) return appTitle;
    return timeFormatter(time) + " - " + appTitle;
}


function timeFormatter() {
    return countingMode.checked ? human_readable.extended_format : human_readable.simple_format;
}
