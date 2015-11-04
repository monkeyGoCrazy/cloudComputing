var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mapSchema = new Schema({
	recordId: Number,
	geoData: [{ip: String, longitude: Number, latitude: Number}],
	attackDS: [{source: String, destination: String, value: Number}],
	normalDS: [{source: String, Destination: String}],
	victimData: [{destination: String, value: Number}]
});
//model's method: find findByld findOne where
var Map = mongoose.model('Map', mapSchema);
module.exports = {
	Map: Map
}