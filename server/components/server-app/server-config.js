const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const session = require('express-session');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise; // to get rid of deprecation warning
mongoose.set("debug", true);

// Connect mongoose to our database
mongoose.connect("mongodb://localhost:27017/test", {
    // sets how many times to try reconnecting
    reconnectTries: Number.MAX_VALUE,
    // sets the delay between every retry (milliseconds)
    reconnectInterval: 1000,
    useMongoClient: true
}).catch(function (err) {
    console.error(err)
});

