var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var datasetSchema = new Schema({
    _id: Number,
    CAIDANormal: [String],
    CAIDAAttack: [String]
});
//model's method: find findByld findOne where
var Dataset = mongoose.model('Dataset', datasetSchema);
module.exports = {
    Dataset: Dataset
};