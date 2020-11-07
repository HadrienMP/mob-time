export function handle(data, displayTimeLeftRatio, breakSignal) {
    if (!data.ratio) {
        displayTimeLeftRatio(0);
        return data.state;
    }

    displayTimeLeftRatio(Math.max(0, 1 - data.ratio));

    if (isPomodoroOver(data) && canSignalBreak(data)) {
        breakSignal();
        return {breakSignaled: true}
    }

    return {breakSignaled: data.state.breakSignaled && isPomodoroOver(data)};
}

function canSignalBreak(data) {
    return !data.state.breakSignaled
        && !data.turnInProgress;
}

function isPomodoroOver(data) {
    return data.ratio >= 1;
}
