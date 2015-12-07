var mongoose = require('mongoose');
var Schema;
Schema = mongoose.Schema;

var TrainSchema = new Schema({
    user: String,
    type: {type: String, default:"train"},
    engine: String,
    model: String,
    attack: String,
    normal: String,
    status: String,
    windowSize: Number,
    step: Number,
    threshold: Number,
    date: {type: Date, default: Date.now},
    output_model: String,
    LSTMParameters: {
        batchSize: Number,
        outputDimension: Number,
        sequence: Number,
        percentage: Number,
        validation: Number,
        innerActivation: String,
        activation: String,
        dropOut: Number,
        lossFunction: String,
        classMode: String,
        finalActivationFunction: String,
        epoch: String
    },
    CNNParameters:{},
    SVMParameters:{
        iteration: Number,
        step: Number,
        regParam: Number,
        regType: Number
    },
    DecisionTreeParameters:{
        numClasses: Number
    },
    LogisticRegressionParameters: {
        iteration: Number
    },
    NaiveBayesParameters: {},
    score: Number,
    accurary: Number,
    auc: Number
});
//model's method: find findByld findOne where
var Train = mongoose.model('Train', TrainSchema);
module.exports = {
    Train: Train
};