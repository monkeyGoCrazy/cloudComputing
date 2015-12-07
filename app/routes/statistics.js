// ROUTES FOR OUR API
// =============================================================================
// create our router
var express = require('express');
var AveragePacketRate  = require('../models/statistics').AveragePacketRate;
var AveragePacketData   = require('../models/statistics').AveragePacketData;
var AverageProtocolRate = require('../models/statistics').AverageProtocolRate;
var ProtocolDistribution= require('../models/statistics').ProtocolDistribution;
var AveragePacketSize   = require('../models/statistics').AveragePacketSize;
var TopIP   = require('../models/statistics').TopIP;
var TopCountry     = require('../models/statistics').TopCountry;
//var CountryDistribution     = require('../models/statistics').CountryDistribution;
var BehaviorOfOneIP     = require('../models/statistics').BehaviorOfOneIP;
var FeatureDistribution     = require('../models/statistics').FeatureDistribution;
var Train = require('../models/train').Train;
var Test = require('../models/test').Test;

var StatisticHandler = express.Router();

// middleware to use for all requests
StatisticHandler.use(function(req, res, next) {
    // do logging
    console.log('statistics is happening.');
    next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
//StatisticHandler.route('/')
//    .get(function(req, res) {
//        res.json({ message: "Please select one record"});
//        });
//});



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
module.exports = StatisticHandler;