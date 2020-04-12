// Configure dotenv for local development
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// Get the packages we need
var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

// Create our Express application
var app = express();

// Use environment defined port or 4000
var port = process.env.PORT || 4000;

// Connect to a MongoDB
mongoose.connect(process.env.MONGO_CONNECTION,  { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });

// Allow CORS so that backend and frontend could be put on different servers
var allowCrossDomain = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
};
app.use(allowCrossDomain);

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Use routes as a module (see index.js)
require('./routes')(app);

// Start the server
app.listen(port);
console.log('Server running on port ' + port);
