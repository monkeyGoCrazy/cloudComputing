var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TestSchema = new Schema({
    type: {type: String, default:"test"},
    date: {type: Date, default: Date.now},
    normal: String,
    attack: String,
    status: String,
    engine: String,
    model: String,
    windowSize: String,
    step: String,
    threshold: String,
    trainModelId: String,
    batchSize: Number,
    accurary: Number,
    auc: Number,
    score: Number

});
//model's method: find findByld findOne where
var Test = mongoose.model('Test', TestSchema);
module.exports = {
    Test: Test
};