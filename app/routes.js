const path = require('path');
var Twit = require('twit');
import config from './config';

var twitter = new Twit(config);
const track = {
    track: 'boston',
    tweet_mode: 'extended'
}
var sockets = [];

export default function (app, io) {

    var stream = twitter.stream('statuses/filter', track);
    io.on('connection', (socket) => {

        console.log('User connected');
        sockets.push(socket.id);
        stream.start();
        socket.on('disconnect', function () {
            console.log('User disconnected');
            sockets.splice(sockets.indexOf(socket.id), 1);
            if (sockets.length == 0)
                stream.stop();
        });

        stream.on('tweet', function (tweet) {
            console.log(tweet.user.id)
            io.sockets.emit('tweet', tweet);
        });

    });

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/dist/index.html'))
    });

};