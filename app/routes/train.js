// train routers
var express = require('express');
var os = require('os');
var TrainHandler = express.Router();
TrainHandler.use(express.logger('dev'));
TrainHandler.use(express.bodyParser());
TrainHandler.use(app.router);
var Train = require('../models/train').Train;
// middleware to use for all requests
//TrainHandler.use(function(req, res, next) {
//    // do logging
//    console.log('Something is happening.');
//    next();
//});
TrainHandler.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next();
});
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
TrainHandler.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to ddos world!' });
});

// on routes that end in /bears
// ----------------------------------------------------
var openConnections = [];
TrainHandler.route('/')

    .post(function(req, res) {
        var train = new Train();
        if (req.body.model === "LSTM") {
            train.engine = req.body.engine;
            train.model = req.body.model;
            train.dataSet = req.body.dataSet;
            train.sequence = req.body.sequence;
            train.percentage = req.body.percentage;
            train.validation = req.body.validation;
            train.innerActivation = req.body.innerActivation;
            train.activation = req.body.activation;
            train.dropOut = req.body.dropOut;
            train.lossFunction = req.body.lossFunction;
            train.classMode = req.body.classMode;
            train.finalActivationFunction = req.body.finalActivationFunction;
        }
        if (req.body.model === "RNN") {
            ///////////
        }
        if (req.body.model === "CNN") {
            ///
        }
        if (req.body.engine === "keras") {
            var python = require('child_process').spawn(
                'python',
                // second argument is array of parameters, e.g.:
                ["DeepLearner.py"
                    , req.body.model
                    , req.body.dataSet
                    , req.body.sequence
                    , req.body.percentage
                    , req.body.validation
                    , req.body.innerActivation
                    , req.body.activation
                    , req.body.dropOut
                    , req.body.lossFunction
                    , req.body.classMode
                    , req.body.finalActivationFunction]
            );
            var output = "";
            python.stdout.on('data', function(){ output += data });
            python.on('close', function(code){
                if (code !== 0) {  return res.send(500, code); }
                return res.send(200, output)
            });
        }

    })

    // get all the bears (accessed at GET http://localhost:8080/api/bears)
    .get(function(req, res) {
        Train.find(function(err, result) {
            if (err)
                res.send(err);

            res.json(result);
        });
        // set timeout as high as possible
        req.socket.setTimeout(Infinity);

        // send headers for event-stream connection
        // see spec for more information
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        });
        res.write('\n');

        // push this res object to our global variable
        openConnections.push(res);

        // When the request is closed, e.g. the browser window
        // is closed. We search through the open connections
        // array and remove this connection.
        req.on("close", function() {
            var toRemove;
            for (var j =0 ; j < openConnections.length ; j++) {
                if (openConnections[j] == res) {
                    toRemove =j;
                    break;
                }
            }
            openConnections.splice(j,1);
            console.log(openConnections.length);
        });
    });
setInterval(function() {
    // we walk through each connection
    openConnections.forEach(function(resp) {
        var d = new Date();
        resp.write('id: ' + d.getMilliseconds() + '\n');
        resp.write('data:' + createMsg() +   '\n\n'); // Note the extra newline
    });

}, 1000);

function createMsg() {
    msg = {};

    msg.hostname = os.hostname();
    msg.type = os.type();
    msg.platform = os.platform();
    msg.arch = os.arch();
    msg.release = os.release();
    msg.uptime = os.uptime();
    msg.loadaverage = os.loadavg();
    msg.totalmem = os.totalmem();
    msg.freemem = os.freemem();

    return JSON.stringify(msg);
}
// on routes that end in /bears/:bear_id
// ----------------------------------------------------
TrainHandler.route('/train/:record_id')

    // get the bear with that id
    .get(function(req, res) {
        Map.findById(req.params.record_id, function(err, map) {
            if (err)
                res.send(err);
            res.json(map);
        });
    });

module.exports = TrainHandler;
