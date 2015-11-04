// =============================================================================
// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');
var router	   = require('./routes/map');
var statisticsHandler	   = require('./routes/statistics');
var trainHandler    = require('./routes/train');
var testHandler = require('./routers/test');

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 8080; // set our port

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/deepdefense'); // connect to our database



// REGISTER OUR ROUTES -------------------------------
app.use('/', router);
app.use('/statistics',statisticsHandler);
app.use('/train', trainHandler);
app.use('/test', testHandler);
// START THE SERVER
// =============================================================================
app.listen(port,'10.137.108.47');
console.log('Magic happens on port ' + port);