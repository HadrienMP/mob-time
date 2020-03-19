let express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000;
const mobTurns = require("./mob_turns");
const fs = require("fs");
const path = require("path");

app.get("/", function (req, res) {
    res.render("index");
});

app.get("/:mob/status", function (req, res) {
    mobTurns.get(req.params.mob).then(mob => res.json(mob.getState()));
});

io.on('connection', function (socket) {
    console.log('a user connected');

    socket.on('interrupt mob', name => {
        console.log(`Mob "${name}" interrupted`);
        mobTurns.stop(name);
        socket.emit('interrupt mob');
    });

    socket.on('start mob', (name, lengthInMinutes) => {
        console.log(`Mob "${name}", of length ${lengthInMinutes}min started`);
        mobTurns.start(name, parseInt(lengthInMinutes));
    });
});

app.use(express.static('src/front'));
app.set('views', path.join(__dirname, '../front'));
app.set('view engine', 'pug');

http.listen(PORT, () => console.log(`Server started on http://0.0.0.0:${PORT}`));
