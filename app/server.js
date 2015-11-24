// =============================================================================
// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
//var server = require('http').Server(app);
//var io = require('socket.io')(server);
//server.listen(80);
var morgan     = require('morgan');
var router	   = require('./routes/map');
var statisticsHandler2	   = require('./routes/statistics2');
var trainHandler    = require('./routes/train');
var testHandler = require('./routes/test');

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

var port = process.env.PORT || 8080; // set our port

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/deepdefense'); // connect to our database



// REGISTER OUR ROUTES -------------------------------
app.use('/map', router);
app.use('/analysis',statisticsHandler2);
app.use('/train', trainHandler);
app.use('/test', testHandler);
// START THE SERVER
// =============================================================================
app.listen(port,'127.0.0.1');
console.log('Magic happens on port ' + port);
