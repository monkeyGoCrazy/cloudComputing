var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StatisticsSchema = new Schema({
    _id: Number,
    dataSet: String,
    user: Number,
    method: String,
    date: {type: Date, default: Date.now},
    Map: {
        geoData: [{ip: String, longitude: Number, latitude: Number}],
        attackDS: [{source: String, destination: String, value: Number}],
        normalDS: [{source: String, Destination: String}],
        victimData: [{destination: String, value: Number}]
    },
    AveragePacketRate: {
        normal_X: [Number],
        attack_X: [Number],
        normal_Y: [Number],
        attack_Y: [Number],
        normal_average: Number,
        normal_max: Number,
        normal_min: Number,
        attack_average: Number,
        attack_max: Number,
        attack_min: Number
    },
    AveragePacketData: {
        normal_X: [Number],
        attack_X: [Number],
        normal_Y: [Number],
        attack_Y: [Number],
        normal_average: Number,
        normal_max: Number,
        normal_min: Number,
        attack_average: Number,
        attack_max: Number,
        attack_min: Number
    },
    AverageProtocolRate: {
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
    },
    TopSendIPData: {
        normal:{
            IP:[{ip:String,rate:Number}]
        },
        attack:{
            IP:[{ip:String,rate:Number}]
        }
    },
    TopReceiveIPData: {
        normal:{
            IP:[{ip:String,rate:Number}]
        },
        attack:{
            IP:[{ip:String,rate:Number}]
        }
    },
    ProtocolDistribution: {
        normal:{
            X:Number,
            normal_HTTP:Number,
            normal_TCP:Number,
            normal_ICMP:Number,
            normal_UDP:Number,
            normal_others: Number

        },
        attack:{
            X:Number,
            attack_HTTP:Number,
            attack_TCP:Number,
            attack_ICMP:Number,
            attack_UDP:Number,
            attack_others:Number
        }
    },
    AveragePacketSize: {
        X: [Number],
        normal_Y: [Number],
        attack_Y: [Number]
    },
    //TopIP: {
    //    IP:[{ip:String,rate:Number}]
    //},
    TopCountry: {
        IP:[{country:String, rate:Number}]
    },
    BehaviorOfTopIP: {
        attackBehaviorOfSource: [{
            IP: String,
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
        }],
        attackBehaviorOfDestination:  [{
            IP: String,
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
        }],
        normalBehaviorOfSource:  [{
            IP: String,
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
        }],
        normalBehaviorOfDestination:  [{
            IP: String,
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
        }]

    }
});

//model's method: find findByld findOne where
var Statistics = mongoose.model('Statistics', StatisticsSchema);


module.exports = {
    Statistics: Statistics

};