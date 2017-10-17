const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const listEndpoints = require('express-list-endpoints');

const session = require('express-session');

const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

mongoose.Promise = global.Promise; // to get rid of deprecation warning
mongoose.set("debug", true);

// Connect mongoose to our database
const connection = mongoose.createConnection("mongodb://localhost:27017/test");


autoIncrement.initialize(connection);

