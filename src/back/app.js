let express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000;
const mobTurns = require("./mob_turns");
const mobSettings = require("./mob_settings");
const path = require("path");

app.get("/", (req, res) => res.render("home.pug"));
app.get("/index.html", (req, res) => res.redirect("/"));
app.get("/:mob", (req, res) => mobSettings.getLength(req.params.mob)
                                          .then(length => res.render("mob.pug", {
                                              mobName: req.params.mob,
                                              length
                                          })));
app.get("/:mob/status", (req, res) => mobTurns.get(req.params.mob)
                                              .then(mob => res.json(mob.getState())));

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

app.use(express.static('src/front'));
app.set('views', path.join(__dirname, '../front'));
app.set('view engine', 'pug');

http.listen(PORT, () => console.log(`Server started on http://0.0.0.0:${PORT}`));
