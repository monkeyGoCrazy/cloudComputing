// train routers
var express = require('express');
var server = require('http').Server(app);
var app = express();
var io = require('socket.io')(server);
server.listen(8083,'127.0.0.1');
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
var Dataset = require('../models/dataset').Dataset;
var Statistics = require('../models/statistics2').Statistics;
TrainHandler.use(bodyParser.urlencoded({ extended: true }));
TrainHandler.use(bodyParser.json());
// middleware to use for all requests

TrainHandler.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next();
});
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
//TrainHandler.get('/', function(req, res,next) {
//    Train.find(function(err, result) {
//        if (err)
//            res.send(err);
//
//        res.json(result);
//    });
//    next();
//});

// on routes that end in /new
// ----------------------------------------------------
TrainHandler.route('/')

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
            train.normal = req.body.normal;
            train.attack = req.body.attack;
            train.status = 'running';
            train.LSTMParameters.windowSize = req.body.windowSize;
            train.LSTMParameters.step = req.body.step;
            train.LSTMParameters.threshold = req.body.threshold;
            train.LSTMParameters.outputDimension = req.body.outputDimension;
            train.LSTMParameters.sequence = req.body.sequence;
            train.LSTMParameters.percentage = req.body.percentage;
            train.LSTMParameters.validation = req.body.validation;
            train.LSTMParameters.innerActivation = req.body.innerActivation;
            train.LSTMParameters.activation = req.body.activation;
            train.LSTMParameters.dropOut = req.body.dropOut;
            train.LSTMParameters.lossFunction = req.body.lossFunction;
            train.LSTMParameters.classMode = req.body.classMode;
            train.LSTMParameters.finalActivationFunction = req.body.finalActivationFunction;
            train.LSTMParameters.epoch = req.body.epoch;
        }
        if (req.body.model === "CNN") {
            ///
        }
        if (req.body.model === "LogisticRegression") {
            train.engine = req.body.engine;
            train.model = req.body.model;
            train.dataSet = req.body.dataSet;
            train.LogisticRegressionParameters.iteration = req.body.iteration;
            train.save(function (err) {
                if (err)
                    res.send(err);
            });
        }
        if (req.body.model === "SVM") {
            train.engine = req.body.engine;
            train.model = req.body.model;
            train.dataSet = req.body.dataSet;
            train.SVMParameters.iteration = req.body.SVMIteration;
            train.SVMParameters.step = req.body.step;
            train.SVMParameters.regParam = req.body.regParam;
            train.SVMParameters.regType = req.body.regType;
            train.save(function (err) {
                if (err)
                    res.send(err);
            });
        }
        if (req.body.model === "NaiveBayes") {
            train.engine = req.body.engine;
            train.model = req.body.model;
            train.dataSet = req.body.dataSet;
        }
        if (req.body.model === "DecissionTree") {
            train.engine = req.body.engine;
            train.model = req.body.model;
            train.dataSet = req.body.dataSet;
            train.DecisionTreeParameters.numClasses = req.body.numberOfClasses;
            train.save(function (err) {
                if (err)
                    res.send(err);
            });
        }
        if (req.body.model === "LogisticRegression") {
            train.engine = req.body.engine;
            train.model = req.body.model;
            train.dataSet = req.body.dataSet;
            train.LogisticRegressionParameters.iteration = req.body.logiIteration;
            train.save(function (err) {
                if (err)
                    res.send(err);
            });
        }
        if (req.body.engine === "keras") {
            if (req.body.model === "LSTM") {
                var child = spawn('python',
                    ["LSTM.py"
                        , statistic._id
                        , req.body.normal
                        , req.body.attack
                        , req.body.windowSize
                        , req.body.step
                        , req.body.threshold
                        , req.body.batchSize
                        , req.body.outputDimension
                        , req.body.sequence
                        , req.body.percentage
                        , req.body.validation
                        , req.body.innerActivation
                        , req.body.activation
                        , req.body.dropOut
                        , req.body.lossFunction
                        , req.body.classMode
                        , req.body.finalActivationFunction
                        , req.body.epoch
                    ]
                );
                child.stderr.on('data',function(data) {
                    console.log('Failed to start child process.');
                    train.status = 'failed';
                    res.send(500, data);
                });

                //res.writeHead(200, { "Content-Type": "text/event-stream",
                //    "Cache-control": "no-cache" });
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
                    //   res.write('data: ' + data.toString() + "\n\n");
                });
                child.on('close', function(code){
                    // if (code !== 0) {  res.send(500, code); }
                    res.send(200, output)
                });
            }
            if (req.body.model === "CNN") {
                var child = spawn('python',
                    ["CNN.py"
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

                //res.writeHead(200, { "Content-Type": "text/event-stream",
                //    "Cache-control": "no-cache" });
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
                    //   res.write('data: ' + data.toString() + "\n\n");
                });
                child.on('close', function(code){
                    // if (code !== 0) {  res.send(500, code); }
                    res.send(200, output)
                });
            }

        }
        else if (req.body.engine === "MLlib"){
            if (req.body.engine === "MLlib") {
                if (req.body.model === "LogisticRegression") {
                    var child = spawn('python',
                        ["LR.py"
                            , req.body.dataSet
                            , req.body.logiIteration
                        ]
                    );
                    child.stderr.on('data',function(data) {
                        console.log('Failed to start child process.');
                        res.send(500, data);
                    });
                    child.stdout.on('data', function(data){
                        console.log('stdout'+ data);
                        output += data.toString();
                    });
                    child.on('close', function(code){
                        res.send(200, output)
                    });
                }
                else if (req.body.model === "SVM"){
                    var child = spawn('python',
                        ["LR.py"
                            , req.body.dataSet
                            , req.body.SVMIteration
                            , req.body.step
                            , req.body.regParam
                            , req.body.regType
                        ]
                    );
                    child.stderr.on('data',function(data) {
                        console.log('Failed to start child process.');
                        res.send(500, data);
                    });
                    child.stdout.on('data', function(data){
                        console.log('stdout'+ data);
                        output += data.toString();
                    });
                    child.on('close', function(code){
                        res.send(200, output)
                    });
                }
                else if (req.body.model === "NaiveBayes") {
                    var child = spawn('python',
                        ["NaiveBayes.py"
                            , req.body.dataSet
                        ]
                    );
                    child.stderr.on('data',function(data) {
                        console.log('Failed to start child process.');
                        res.send(500, data);
                    });
                    child.stdout.on('data', function(data){
                        console.log('stdout'+ data);
                        output += data.toString();
                    });
                    child.on('close', function(code){
                        res.send(200, output)
                    });
                }
                else if (req.body.model === "DecisonTree") {
                    var child = spawn('python',
                        ["DecisionTree.py"
                            , req.body.dataSet
                            , req.body.numberOfClasses
                        ]
                    );
                    child.stderr.on('data',function(data) {
                        console.log('Failed to start child process.');
                        res.send(500, data);
                    });
                    child.stdout.on('data', function(data){
                        console.log('stdout'+ data);
                        output += data.toString();
                    });
                    child.on('close', function(code){
                        res.send(200, output)
                    });
                } else {
                    res.send(200, "unsupported model")
                }
            }
        }

    }

    );

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

TrainHandler.route('/dataset')
    // get the dataset
    .get(function(req, res){
        Dataset.find(function(err, result){
           if (err)
                res.send(err);
            res.json(result);
        });
    })
    .post(function(req, res){
        var dataset = new Dataset();
        dataset.CAIDA_normal = 'normal1';
        dataset.CAIDA_attack = 'attack1';
        res.send('success');
    });

module.exports = TrainHandler;
