const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
import routes from './app/routes';

var PORT = process.env.PORT || 5555;

var app = express();
app.use(bodyParser.json());
app.use(cors());
routes(app);

app.listen(PORT);
console.log('Running on port ' + PORT);