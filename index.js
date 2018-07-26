const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
import routes from './app/routes';

var PORT = process.env.PORT || 4000;

var app = express();

app.use(express.static(path.join(__dirname, 'public/dist')));
app.use(bodyParser.json());
app.use(cors());

routes(app);

app.listen(PORT);
console.log('Running on port ' + PORT);