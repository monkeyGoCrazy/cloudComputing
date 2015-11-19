var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Train = require('../models/train').Train;
var TestSchema = new Schema({
    _id: Number,
    user: String,
    date: {type: Date, default: Date.now},
    status: String,
    engine: String,
    model: String,
    TrainModel: String,
    dataSet: String,
    accurary: Number,
    falsePositive: Number,
    falseNegitive: Number
});
//model's method: find findByld findOne where
var Test = mongoose.model('Test', TestSchema);
module.exports = {
    Test: Test
};