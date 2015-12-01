// test routers
var express = require('express');
//var server = require('http').Server(app);
//var app = express();
//var io = require('socket.io')(server);
//server.listen(8088,'127.0.0.1');
var spawn = require('child_process').spawn;
var os = require('os');
var util = require('util');
var http = require('http');
var path = require('path');
var TestHandler = express.Router();
var morgan     = require('morgan');
var bodyParser = require('body-parser');
TestHandler.use(morgan('dev')); // log requests to the console
var Test = require('../models/test').Test;
var Statistics = require('../models/statistics2').Statistics;
var Train = require('../models/train').Train;
TestHandler.use(bodyParser.urlencoded({ extended: true }));
TestHandler.use(bodyParser.json());

TestHandler.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next();
});
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
TestHandler.get('/', function(req, res,next) {
    Train.find('',function(err, result) {
        if (err)
            res.send(err);
        res.send(result);
    });
    next();
});

// on routes that end in /new
// ----------------------------------------------------
TestHandler.route('/new')

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
        var model = "";
        Train.findById(req.body.trainId, function(err, train){
            model += train.output_model;
        });
        var test = new Test();
        test._id = statistic._id;
        if (req.body.model === "LSTM") {
            test.engine = req.body.engine;
            test.model = req.body.model;
            test.dataSet = req.body.dataSet;
            test.TrainModel = model;
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
                ["DeepTest.py"
                    , test._id
                    , model
                    , req.body.dataSet
                ]
            );
            child.stderr.on('data',function(data) {
                console.log('Failed to start child process.');
                res.send(500, data);
            });
            res.writeHead(200, { "Content-Type": "text/event-stream",
                "Cache-control": "no-cache" });
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
        var json = {};
        Train.find(function(err, result) {
            if (err)
                res.send(err);

            json.train = result;
        });
        Test.find(function(err,result) {
           if (err)
               res.send(err);
            json.test = result;
        });
        res.send(json);
    });

// on routes that end in /test/:_id
// ----------------------------------------------------
TestHandler.route('/:_id')

    // get the bear with that id
    .get(function(req, res) {
        Test.findById(req.params._id, function(err, test) {
            if (err)
                res.send(err);
            res.json(test);
        });
        Statistics.findById(req.params._id, function(err, stat) {
            if (err)
                res.send(err);
            res.json(stat);
        });
    });
TestHandler.route('/dataset')
    // get the dataset
    .get(function(req, res){
        Dataset.find(function(err, result){
            if (err)
                res.send(err);
            res.json(result);
        });
    });
module.exports = TestHandler;