var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var datasetSchema = new Schema({
    _id: Number,
    CAIDA_normal: [{name: String, size: Number}],
    CAIDA_attack: [{name: String, size: Number}]
});
//model's method: find findByld findOne where
var Dataset = mongoose.model('Dataset', datasetSchema);
module.exports = {
    Dataset: Dataset
};