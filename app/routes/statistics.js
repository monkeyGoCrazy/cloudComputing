// ROUTES FOR OUR API
// =============================================================================
// create our router
var express = require('express');
var AveragePacketBytes  = require('../models/statistics').AveragePacketBytes;
var AveragePacketBits   = require('../models/statistics').AveragePacketBits;
var AverageProtocolRate = require('../models/statistics').AverageProtocolRate;
var ProtocolDistribution= require('../models/statistics').ProtocolDistribution;
var AveragePacketSize   = require('../models/statistics').AveragePacketSize;
var TopIP   = require('../models/statistics').TopIP;
var TopCountry     = require('../models/statistics').TopCountry;
var CountryDistribution     = require('../models/statistics').CountryDistribution;
var BehaviorOfOneIP     = require('../models/statistics').BehaviorOfOneIP;
var FeatureDistribution     = require('../models/statistics').FeatureDistribution;

var StatisticHandler = express.Router();

// middleware to use for all requests
StatisticHandler.use(function(req, res, next) {
    // do logging
    console.log('statistics is happening.');
    next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
StatisticHandler.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to ddos world!' });
});


// on routes that end in /bears/:bear_id
// ----------------------------------------------------
StatisticHandler.route('/:record_id')

    // get the bear with that id
    .get(function(req, res) {
        Map.findById(req.params.record_id, function(err, map) {
            if (err)
                res.send(err);
            res.json(map);
        });
    });
StatisticHandler.r
module.exports = StatisticHandler;