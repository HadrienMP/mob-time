export function simple_format(milliseconds) {
    let seconds = toSeconds(milliseconds);
    if (seconds >= 60) {
        return `${Math.round(seconds / 60)} min`;
    }
    return seconds + " s";
}

export function extended_format(milliseconds) {
    let seconds = toSeconds(milliseconds);
    let human_readable = "";
    if (seconds >= 60) {
        human_readable += `${Math.floor(seconds / 60)} min`;
    }
    return `${human_readable} ${seconds % 60} s`;
}

function toSeconds(milliseconds) {
    return Math.round(milliseconds / 1000);
}

