var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AveragePacketBytesSchema = new Schema({
    _id: Number,
    X: [Number],
    normal_Y: [Number],
    attack_Y: [Number],
    normal_average: Number,
    normal_max: Number,
    normal_min: Number,
    attack_average: Number,
    attack_max: Number,
    attack_min: Number
});
var AveragePacketBitsSchema = new Schema({
    _id: Number,
    X: [Number],
    normal_Y: [Number],
    attack_Y: [Number],
    normal_average: Number,
    normal_max: Number,
    normal_min: Number,
    attack_average: Number,
    attack_max: Number,
    attack_min: Number
});
var AverageProtocolRateSchema = new Schema({
    _id: Number,
    normal:{
        X:[Number],
        normal_HTTP:[Number],
        normal_TCP:[Number],
        normal_ICMP:[Number],
        normal_UDP:[Number],
        normal_others:[Number]
    },
    attack:{
        X:[Number],
        attack_HTTP:[Number],
        attack_TCP:[Number],
        attack_ICMP:[Number],
        attack_UDP:[Number],
        attack_others:[Number]
    }
});
var ProtocolDistributionSchema = new Schema({
    _id: Number,
    normal:{
        X:Number,
        normal_HTTP:Number,
        normal_TCP:Number,
        normal_ICMP:Number,
        normal_UDP:Number

    },
    attack:{
        X:Number,
        attack_HTTP:Number,
        attack_TCP:Number,
        attack_ICMP:Number,
        attack_UDP:Number,
        attack_others:Number
    }
});
var AveragePacketSizeSchema = new Schema({
    _id: Number,
    X: [Number],
    normal_Y: [Number],
    attack_Y: [Number]
});
var TopIPSchema = new Schema({
    _id: Number,
    IP:[{ip:String,rate:Number}]
});
var TopCountrySchema = new Schema({
    _id: Number,
    IP:[{country:String, rate:Number}]
});
var CountryDistributionSchema = new Schema({
    _id: Number,
    IP:[{country:String, rate:Number}]
});
var BehaviorOfOneIPSchema = new Schema({
    _id: Number,
    IP:[
        {
            ip_address: String,
            Source: {
                PacketNumber: Number,
                FirstConnection: Number,
                LastConnection: Number,
                Protocols: [{Name: String, rate: Number}],
                Country: [{Name: String, rate: Number}],
                Hours: [{Hour: Number, rate: Number}]
            },
            Destination:{
                PacketNumber: Number,
                FirstConnection: Number,
                LastConnection: Number,
                Protocols: [{Name: String, rate: Number}],
                Country: [{Name: String, rate: Number}],
                Hours:[{Hour: Number, rate: Number}]
            }
        }
    ]
});
var FeatureDistributionSchema = new Schema ({
    ///
});
//model's method: find findByld findOne where
var AveragePacketBytes = mongoose.model('AveragePacketBytes', AveragePacketBytesSchema);
var AveragePacketBits = mongoose.model('AveragePacketBits', AveragePacketBitsSchema);
var AverageProtocolRate = mongoose.model('AverageProtocolRate', AverageProtocolRateSchema);
var ProtocolDistribution = mongoose.model('ProtocolDistribution', ProtocolDistributionSchema);
var AveragePacketSize = mongoose.model('AveragePacketSize', AveragePacketSizeSchema);
var TopIP = mongoose.model('TopIP', TopIPSchema);
var TopCountry = mongoose.model('TopCountry', TopCountrySchema);
var CountryDistribution = mongoose.model('CountryDistribution', CountryDistributionSchema);
var BehaviorOfOneIP = mongoose.model('BehaviorOfOneIP', BehaviorOfOneIPSchema);
var FeatureDistribution = mongoose.model('FeatureDistribution', FeatureDistributionSchema);

module.exports = {
    AveragePacketBytes: AveragePacketBytes,
    AveragePacketBits: AveragePacketBits,
    AverageProtocolRate: AverageProtocolRate,
    ProtocolDistribution: ProtocolDistribution,
    AveragePacketSize: AveragePacketSize,
    TopIP: TopIP,
    TopCountry: TopCountry,
    CountryDistribution: CountryDistribution,
    BehaviorOfOneIP: BehaviorOfOneIP,
    FeatureDistribution: FeatureDistribution
};