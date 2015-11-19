// train routers
var express = require('express');
var server = require('http').Server(app);
var app = express();
var io = require('socket.io')(server);
server.listen(8088,'127.0.0.1');
var spawn = require('child_process').spawn;
var os = require('os');
var util = require('util');
var http = require('http');
var path = require('path');
var TrainHandler = express.Router();
var morgan     = require('morgan');
var bodyParser = require('body-parser');
TrainHandler.use(morgan('dev')); // log requests to the console
var Train = require('../models/train').Train;
var Statistics = require('../models/statistics2').Statistics;
TrainHandler.use(bodyParser.urlencoded({ extended: true }));
TrainHandler.use(bodyParser.json());
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
TrainHandler.get('/', function(req, res,next) {
    Train.find(function(err, result) {
        if (err)
            res.send(err);

        res.json(result);
    });
    next();
});

// on routes that end in /new
// ----------------------------------------------------
TrainHandler.route('/new')

    .post(function(req, res) {
        var output = "";
        var statistic = new Statistics();
        statistic.save(function(err) {
            if (err)
                res.send(err);
        });
        var stat = spawn('python',
            ["Statistic.py"
                ,statistic._id
                ,req.body.dataSet
            ]);
        stat.stderr.on('data',function(data) {
            console.log('Failed to start child process.');
            output += data + "\n";
        });
        stat.stdout.on('data', function(data) {
            console.log(data);
            output += data + "\n";
        });
        var train = new Train();
        train._id = statistic._id;
        if (req.body.model === "LSTM") {
            train.engine = req.body.engine;
            train.model = req.body.model;
            train.dataSet = req.body.dataSet;
            train.LSTMParameters.sequence = req.body.sequence;
            train.LSTMParameters.percentage = req.body.percentage;
            train.LSTMParameters.validation = req.body.validation;
            train.LSTMParameters.innerActivation = req.body.innerActivation;
            train.LSTMParameters.activation = req.body.activation;
            train.LSTMParameters.dropOut = req.body.dropOut;
            train.LSTMParameters.lossFunction = req.body.lossFunction;
            train.LSTMParameters.classMode = req.body.classMode;
            train.LSTMParameters.finalActivationFunction = req.body.finalActivationFunction;
        }
        if (req.body.model === "RNN") {
            ///////////
        }
        if (req.body.model === "CNN") {
            ///
        }
        train.save(function(err) {
            if (err)
                res.send(err);
        });

        if (req.body.engine === "keras") {
            var child = spawn('python',
                    ["DeepLearner.py"
                        , req.body.model
                        , req.body.dataSet
                        , req.body.sequence
                        , req.body.percentage
                        , req.body.validation
                        , req.body.innerActivation
                        , req.body.activation
                        , req.body.innerActivation
                        , req.body.activation
                        , req.body.dropOut
                        , req.body.lossFunction
                        , req.body.classMode
                        , req.body.finalActivationFunction
                    ]
            );
            child.stderr.on('data',function(data) {
                console.log('Failed to start child process.');
                res.send(500, data);
            });
            res.writeHead(200, { "Content-Type": "text/event-stream",
                "Cache-control": "no-cache" });
            //console.log('stdout'+'keras');
            //io.sockets.on('connection', function(socket){
            //    console.log('new user connected');
            //    child.stdout.on('data', function(data){
            //        output +=data.toString();
            //        socket.emit('news', ouput);
            //    })
            //});
            child.stdout.on('data', function(data){
                console.log('stdout'+ data);
                output += data.toString();
                res.write('data: ' + data.toString() + "\n\n");
            });
            child.on('close', function(code){
               // if (code !== 0) {  res.send(500, code); }
                res.send(200, output)
            });
        }

    })

    // get all the bears (accessed at GET http://localhost:8080/api/bears)
    .get(function(req, res) {
        Train.find(function(err, result) {
            if (err)
                res.send(err);

            res.send(result);
        });
    });

// on routes that end in /train/:_id
// ----------------------------------------------------
TrainHandler.route('/:_id')

    // get the bear with that id
    .get(function(req, res) {
        Train.findById(req.params._id, function(err, train) {
            if (err)
                res.send(err);
            res.json(train);
        });
    });

module.exports = TrainHandler;
