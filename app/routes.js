const path = require('path');
var Twit = require('twit');
import nlp from './nlp';
import config from './config';

var twitter = new Twit(config);

export default function (app) {

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/dist/index.html'))
    });

};