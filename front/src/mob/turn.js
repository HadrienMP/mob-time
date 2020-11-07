const events = require("../events").events;
document.addEventListener(events.TURN_STARTED, () => inProgress = true);
document.addEventListener(events.TURN_ENDED, () => inProgress = false);
document.addEventListener(events.TURN_INTERRUPTED, () => inProgress = false);

let inProgress = false;

export function isInProgress() {
    return inProgress;
}
