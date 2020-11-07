const allTurns = require("./turn/allTurns");
const allSettings = require("./settings/allSettings");
const pomodoro = require("./pomodoro/facade").get();
exports.setup = io => {
    io.on('connection', function (socket) {
        socket.on('join', name => socket.join(name));

        socket.on('interrupt mob', name => {

            allTurns.stop(name);
        });

        socket.on('start mob', async (name, lengthInMinutes) => {

            let mobTurn = allTurns.start(name, parseFloat(lengthInMinutes));
            await pomodoro.turnStarted(name, mobTurn);
        });

        socket.on('change length', async (mobName, lengthInMinutes) => {
            await allSettings.saveLength(mobName, lengthInMinutes);
            socket.to(mobName).emit('change length', lengthInMinutes);
        });

        socket.on('pomodoro activation change', (mobName, status) => {
            allSettings.get(mobName).then(settings => {
                settings.pomodoro.active = status;
                allSettings.save(mobName, settings);
            });
            socket.to(mobName).emit('pomodoro activation change', status);
        });

        socket.on('pomodoro stop', (mobName) => {
            pomodoro.feature(mobName).stop(mobName);
        });

        socket.on("change turns by pomodoro", (mobName, number) => {
            allSettings.get(mobName).then(settings => {
                settings.pomodoro.turns = number;
                allSettings.save(mobName, settings);
            });
            socket.to(mobName).emit("change turns by pomodoro", number);
        });
    });
};
