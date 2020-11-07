export const events = {
    TURN_ENDED: 'time ran out',
    TURN_STARTED: 'started turn',
    TURN_INTERRUPTED: 'interrupted turn',
    TIME_PASSED: 'time passed'
};

export function throwEventFor(timerStatus, mobInProgress) {
    return detectFrom(timerStatus, mobInProgress);
}

function detectFrom(timerStatus, mobInProgress) {
    if (timerStatus.lengthInMinutes === 0 && mobInProgress === true) {
        let event = events.TURN_INTERRUPTED;
        send(event, timerStatus, mobInProgress);
        return event;
    }
    if (timerStatus.timeLeftInMillis === 0 && mobInProgress === true) {
        let event = events.TURN_ENDED;
        send(event, timerStatus, mobInProgress);
        return event;
    }
    if (timerStatus.timeLeftInMillis > 0 && mobInProgress === false) {
        let event = events.TURN_STARTED;
        send(event, timerStatus, mobInProgress);
        return event;
    }
    let event = events.TIME_PASSED;
    send(event, timerStatus, mobInProgress);
    return event;
}

function send(event, timerStatus, mobInProgress) {
    document.dispatchEvent(new CustomEvent(event, details(timerStatus, mobInProgress)));
}

function details(timerStatus, mobInProgress) {
    return {
        detail: {
            "turn": {"active": mobInProgress},
            "pomodoro": {"ratio": timerStatus.pomodoro?.ratio}
        }
    };
}
