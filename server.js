
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const port = 4000;

const io = new Server(server);

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

server.listen(port, () => {
    console.log('listening on *:' + port);
});


//Liste aller Spieler
const USERS = [];

//Wenn sich ein Client/Spieler verbindet
io.on('connection', (playerSocket) => {
    console.log('a new user is connected ' + playerSocket.id);

    //Wenn sich ein neuer Spieler verbunden hat
    playerSocket.on('new_user', (user) => {
        console.log("new user", user);

        //Informiere den neuen Spieler über die besteheden Spieler
        playerSocket.emit('all_users', USERS);

        //Füge den Spieler zur Spielerliste hinzu
        const newUser = {
            id: playerSocket.id,
            characterName: user.characterName,
            username: user.username,
            animation: user.animation,
            x: user.x,
            y: user.y,
            flipX: user.flipX
        };

        //Füge den neuen Spieler zur Liste der Spieler hinzu,
        //falls dieser Spieler noch nicht existiert
        if (!USERS.find(user => user.id === newUser.id)) {
            USERS.push(newUser);
        }

        //Informiere alle ANDEREN Spieler darüber, dass ein neuer Spieler da ist
        playerSocket.broadcast.emit('new_user_added', newUser);

    })

    //erhält alle 30ms die Spielerdaten des Spielers
    playerSocket.on('update_user', (userData) => {
        // console.log(user.characterName, user.x, user.y)

        //Aktualisiere die Spielerdaten des Spielers
        for(const user of USERS) {
            if(user.id === userData.id) {
                user.x = userData.x
                user.y = userData.y
                user.animation = userData.animation
                user.flipX = userData.flipX
            }
        }
    })

    playerSocket.on('disconnect', () => {
        //Entferne Spieler aus Spielerliste
        for(const user of USERS) {
            if(user.id === playerSocket.id) {
                USERS.splice(USERS.indexOf(user), 1);
            }
        }

        //Informiere alle ANDEREN Spieler darüber, dass ein Spieler weg ist
        playerSocket.broadcast.emit('user_disconnected', playerSocket.id);

    })

})

//sende alle 30ms alle Spielerdaten an alle Spieler
setInterval(() => {
    io.emit('update_users', USERS);
}, 30)
