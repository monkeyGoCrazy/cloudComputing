var mongoose = require('mongoose');
var Schema;
Schema = mongoose.Schema;

//var TrainSchema = new Schema({
//    engine: String,
//    model: String,
//    dataSet: String,
//    sequence: Number,
//    percentage: Number,
//    validation: Number,
//    innerActivation: String,
//    activation: String,
//    dropOut: Number,
//    lossFunction: String,
//    classMode: String,
//    finalActivationFunction: String,
//    loss: Number,
//    accurary: Number,
//    falsePositive: Number,
//    falseNegitive: Number
//});
var TrainSchema = new Schema({
    engine: String,
    model: String,
    dataSet: String,
    LSTMParameters: {
        sequence: Number,
        percentage: Number,
        validation: Number,
        innerActivation: String,
        activation: String,
        dropOut: Number,
        lossFunction: String,
        classMode: String,
        finalActivationFunction: String,
    },
    CNNParameters:{},
    RNNParameters:{},
    SVMParameters:{},
    DecisionTreeParameters:{},
    loss: Number,
    accurary: Number,
    falsePositive: Number,
    falseNegitive: Number
});
//model's method: find findByld findOne where
var Train = mongoose.model('Train', TrainSchema);
module.exports = {
    Train: Train
};