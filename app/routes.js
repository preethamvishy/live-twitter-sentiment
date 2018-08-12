const path = require('path');
var Twit = require('twit');
import nlp from './nlp';
import config from './config';

var twitter = new Twit(config);

export default function (app, io) {

    io.on('connection', (socket) => {

        var stream = null;
        console.log('User connected');

        socket.on('disconnect', function () {
            console.log('User disconnected');
            if (stream !== null && stream !== undefined)
                stream.stop();
        });

        socket.on('new-stream', function (track) {
            console.log(track)
            stream = twitter.stream('statuses/filter', track);
            stream.on('tweet', function (tweet) {
                var nlProcessedData = nlp(tweet);
                tweet.nlprocessed = nlProcessedData;
                socket.emit('tweet', tweet);
            });
        });

        socket.on('stop-stream', function (track) {
            console.log('stop stream event')
            if (stream !== null && stream !== undefined)
                stream.stop();
            socket.disconnect();
        });
    });

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/dist/index.html'))
    });

};