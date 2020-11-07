class Turn {
    constructor(lengthInSeconds = 0, startTime = new Date()) {
        this.lengthInSeconds = lengthInSeconds;
        this.startTime = startTime;
    }

    getState() {
        return {
            lengthInMinutes: this.lengthInSeconds / 60,
            timeLeftInMillis: this.timeLeft()
        };
    }

    timeLeft() {
        return Math.max(0, this.timeLeftInMillis());
    }

    timeLeftInMillis() {
        return this.lengthInSeconds * 1000 - this.elapsedMs();
    }

    elapsedMs() {
        return Math.max(0, new Date() - this.startTime);
    }
}

module.exports = Turn;