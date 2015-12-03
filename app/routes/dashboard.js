// dashborad for DeepDefense
// =============================================================================
// create our router
var express = require('express');
var Statistics  = require('../models/statistics2').Statistics;
var Train = require('../models/train').Train;
var Test = require('../models/test').Test;

var DashboardHandler = express.Router();

// middleware to use for all requests
DashboardHandler.use(function(req, res, next) {
    // do logging
    console.log('statistics is happening.');
    next();
});

// test route to make sure everything is working ()
DashboardHandler.route('/')
    .get(function(req, res) {
        Train.find(function(err, result1){
            if (err)
                res.send(err);
            console.log(result1.toString());
            Test.find(function(err, result2){
                if (err)
                    res.send(err);
                console.log(result2);
                var finalObj = result1.concat(result2);
                res.json(finalObj);
            });
        });

    });

DashboardHandler.route('/:_id')
    .get(function(req, res){
        Statistics.findById(req.params._id, function(err, statistics) {
            if (err)
                res.send(err);
            res.json(statistics);
        })
    });



module.exports = DashboardHandler;