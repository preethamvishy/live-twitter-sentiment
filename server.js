const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
var app = express();
const http = require('http');
const server = http.createServer(app);
var io = require('socket.io').listen(server);
import routes from './app/routes';
import socketManager from './app/socket-manager';

var PORT = process.env.PORT || 4002;


app.use(express.static(path.join(__dirname, 'public/dist')));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());

routes(app);
socketManager(io);

app.set('port', PORT);
server.listen(app.get('port'));
console.log('Running on port ' + PORT);