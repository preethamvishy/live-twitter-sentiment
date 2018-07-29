const path = require('path');
var Twit = require('twit');
import config from './config';

var twitter = new Twit(config);
var sockets = [];

export default function (app, io) {

    var stream = null;
    io.on('connection', (socket) => {

        console.log('User connected');
        sockets.push(socket.id);

        socket.on('disconnect', function () {
            console.log('User disconnected');
            sockets.splice(sockets.indexOf(socket.id), 1);
            if (sockets.length === 0 && stream !== null)
                stream.stop();
        });

        socket.on('new-stream', function (track) {
            console.log(track)
            stream = twitter.stream('statuses/filter', track);
            stream.on('tweet', function (tweet) {
                console.log(tweet.user.id)
                socket.emit('tweet', tweet);
            });
        });
    });

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/dist/index.html'))
    });

};