const durationByPerson = document.getElementById("minutes-by-person");

export function setupSync(socket, mobName) {
    socket.on('change length', length => durationByPerson.value = length);

    durationByPerson.onchange = function () {
        socket.emit("change length", mobName, this.value);
    };
}

export function minutesByPerson() {
    if (mods.includes("fast")) return parseInt(durationByPerson.value) / 60;
    if (mods.includes("faster")) return parseInt(durationByPerson.value) / 600;
    return parseInt(durationByPerson.value);
}