// ROUTES FOR OUR API
// =============================================================================
// create our router
var express = require('express');
var Statistics  = require('../models/statistics2').Statistics;

var Train = require('../models/train').Train;
var Test = require('../models/test').Test;

var StatisticHandler2 = express.Router();

// middleware to use for all requests
StatisticHandler2.use(function(req, res, next) {
    // do logging
    console.log('statistics is happening.');
    next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
StatisticHandler2.route('/')
    .get(function(req, res) {
        Statistics.find(function(err, result){
            if (err)
                res.send(err);
            res.json(result);
        });
    });
StatisticHandler2.route('/:_id')
    .get(function(req, res){
        Statistics.findById(req.params._id, function(err, statistics) {
            if (err)
                res.send(err);
            res.json(statistics);
        })
    });


// on routes that end in /bears/:bear_id
// ----------------------------------------------------
//StatisticHandler.route('/:record_id')
//
//    // get the bear with that id
//    //.get(function(req, res) {
//    //    Map.findById(req.params.record_id, function(err, map) {
//    //        if (err)
//    //            res.send(err);
//    //        res.json(map);
//    //    });
//    });
module.exports = StatisticHandler2;