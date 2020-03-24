const mobTurns = require("./mob/mob_turns");
const mobSettings = require("./mob/mob_settings");
exports.setup = io => {
    io.on('connection', function (socket) {
        socket.on('join', name => socket.join(name));

        socket.on('interrupt mob', name => {
            console.log(`Mob "${name}" interrupted`);
            mobTurns.stop(name);
        });

        socket.on('start mob', (name, lengthInMinutes) => {
            console.log(`Mob "${name}", of length ${lengthInMinutes}min started`);
            mobTurns.start(name, parseInt(lengthInMinutes));
        });

        socket.on('change length', (mobName, lengthInMinutes) => {
            mobSettings.saveLength(mobName, lengthInMinutes);
            socket.to(mobName).emit('change length', lengthInMinutes);
        });
    });
};