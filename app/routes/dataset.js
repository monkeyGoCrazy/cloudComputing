// ROUTES FOR OUR API
// =============================================================================
// create our router
var express = require('express');
var Dataset     = require('../models/dataset').Dataset;
var DatasetHandler = express.Router();

// middleware to use for all requests some new
DatasetHandler.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next();
});


// on routes that end in /dataset
// ----------------------------------------------------
DatasetHandler.route('/')
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
        dataset.save(
            function(err){
                dataset.save();
            });
        res.send('success');
    });


module.exports = DatasetHandler;