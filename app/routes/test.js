// test routers
var express = require('express');
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
TestHandler.use(bodyParser.urlencoded({ extended: true }));
TestHandler.use(bodyParser.json());

TestHandler.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next();
});
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)

// on routes that end in /new
// ----------------------------------------------------
TestHandler.route('/')

    .post(function(req, res) {
        var output = "";
        var statistic = new Statistics();
        statistic.type = "train";
        statistic.engine = req.body.engine;
        statistic.model = req.body.model;
        statistic.normal = req.body.normal;
        statistic.attack = req.body.attack;
        statistic.status = 'running';
        statistic.save(function(err) {
            if (err)
                res.send(err);
        });
        var stat = spawn('python',
            ["statistics/statistic.py"
                ,statistic._id
                ,req.body.normal
                ,req.body.attack
            ]);
        stat.stderr.on('data',function(data) {
            console.log(data.toString());
            output += data + "\n";
        });
        stat.stdout.on('data', function(data) {
            console.log(data);
            output += data + "\n";
        });
        var test = new Test();
        test._id = statistic._id;
        if (req.body.model === "LSTM") {
            test.status = 'running';
            test.engine = req.body.engine;
            test.normal = req.body.normal;
            test.attack = req.body.attack;
            test.model = req.body.model;
            test.trainModelId = req.body.trainModelId;
            test.batchSize = req.body.batchSize;
            test.windowSize = req.body.windowSize;
            test.step = req.body.step;
            test.threshold = req.body.threshold;
            test.save(function(err) {
                if (err)
                    res.send(err);
            });
        }
        if (req.body.model === "CNN") {
            ///
        }

        if (req.body.engine === "keras") {
            if (req.body.model === "LSTM") {
                var child = spawn('python',
                    ["machinelearning/testLSTM.py"
                        , test._id
                        , req.body.normal
                        , req.body.attack
                        , req.body.trainModelId
                        , req.body.windowSize
                        , req.body.step
                        , req.body.threshold
                        , req.body.batchSize
                    ], {
                        detached: true
                    }
                );
                child.unref();
                child.stderr.on('data', function (data) {
                    console.log(data.toString());
                    statistic.status = "failed";
                    test.status = 'failed';
                    statistic.save(function(err) {
                        if (err)
                            res.send(err);
                    });
                    test.save(function(err) {
                        if (err)
                            res.send(err);
                    });
                });
                res.send(200, 'success');
                child.stdout.on('data', function (data) {
                    console.log(data.toString());
                    output += data.toString();
                });
                child.on('close', function (code) {
                    res.send(200, output);
                    test.save(function(err) {
                        if (err)
                            res.send(err);
                    });
                });
            }
        }
    })

    // get all the bears (accessed at GET http://localhost:8080/api/bears)
    .get(function(req, res) {
        var json = {};
        Test.find(function(err,result) {
           if (err)
               res.send(err);
            res.send(result);
           // json.test = result;
        });
      //  res.send(json);
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
module.exports = TestHandler;