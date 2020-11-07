export const events = {
    TURN_ENDED: 'time ran out',
    TURN_STARTED: 'started turn',
    TURN_INTERRUPTED: 'interrupted turn',
    TIME_PASSED: 'time passed'
};

export function throwEventFor(timerStatus, mobInProgress) {
    let event = detectEvent(timerStatus, mobInProgress);
    send(event, timerStatus, mobInProgress);
    return event;
}

function detectEvent(timerStatus, mobInProgress) {
    if (mobInProgress === true) {
        if (timerStatus.lengthInMinutes === 0) {
            return events.TURN_INTERRUPTED;
        }
        if (timerStatus.timeLeftInMillis === 0) {
            return events.TURN_ENDED;
        }
    }
    if (mobInProgress === false && timerStatus.timeLeftInMillis > 0) {
        return events.TURN_STARTED;
    }
    return events.TIME_PASSED;
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
