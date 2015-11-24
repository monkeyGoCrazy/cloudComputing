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
