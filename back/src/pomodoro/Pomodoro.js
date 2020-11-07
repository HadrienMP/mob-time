class Pomodoro {
    constructor(start, length) {
        this.start = start;
        this.length = length;
    }

    status() {
        return {ratio: this.ratio()};
    }

    inProgress() {
        return this.ratio() < 1
    }

    ratio() {
        let raw = this.elapsedMinutes() / this.length;
        return this.to4Digits(raw);
    }

    to4Digits(ratio) {
        return Math.trunc(10000 * ratio) / 10000;
    }

    elapsedMinutes() {
        return (new Date() - this.start) / 60_000;
    }
}

module.exports = Pomodoro;