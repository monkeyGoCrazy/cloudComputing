var dataParsingServices = angular.module('dataParsingServices', []);

/*
dataParsingServices.factory('passDataService', function() {
 var savedData = {}
 function set(data) {
   savedData = data;
 }
 function get() {
 	if(savedData.length != 0){
 		return savedData;
 	}else{
 		return null;
 	}
 }

 return {
  set: set,
  get: get
 }

});

/*
dataParsingServices.factory('mapParseService', function(){
	var normalResult = [], geoLocationResult = {}, attackResult = [], victimResult = [];
	var mapParse = {
		mapParse: function(normalData, geoLocation, attackData, victimData)
		{
			console.log('mapParseService get called!');
			for(var i = 0; i < normalData.length; i++){
		    	var normalFormat = [{"name":normalData[i].source}, {"name":normalData[i].destination}];
		    	normalResult.push(normalFormat);
		    }
			for(var i = 0; i < geoLocation.length; i++){
				var geoCoor = [geoLocation[i].longitude, geoLocation[i].lantitude];
				geoLocationResult[geoLocation[i].ip] = geoCoor;
			}
			for(var i = 0; i < attackData.length; i++){
		    	var attackFormat = [{"name":attackData[i].source}, {"name":attackData[i].destination, "value":attackData[i].value}];
		    	attackResult.push(attackFormat);
		    }
			for(var i = 0; i < victimData.length; i++){
		    	var victimFormat = {"name":victimData[i].destination, "value":victimData[i].value};
		    	victimResult.push(victimFormat);
		    }
		    draw(normalResult, geoLocationResult, attackResult, victimResult);
		}
	};
	return mapParse;
});


dataParsingServices.factory('avrgPcktRateParseService', function(){
	var avrgPcktRateParse = {
		avrgPcktRateParse: function(normalX, normalY, attackX, attackY)
		{

			averagePacketRate(normalX,normalY,attackX,attackY);
		}
	};
	return avrgPcktRateParse;
});

dataParsingServices.factory('protocolService', function(){
	var protocolParse = {
		protocolParse: function(title, protocol, xAxis, UDP, HTTP, TCP, ICMP, Others){
			var protocolResult = [];
			var protocolNames = [];
			for(key in protocol){
				var keyValue = key;
				if(key == "x"){
					continue;
				}else{
					protocolFormat = {"value":protocol[keyValue], "name":keyValue};
					protocolResult.push(protocolFormat);
					protocolNames.push(key);
				}
			}
			protocolDistriAnalysis(title, protocolNames, protocolResult, xAxis, UDP, HTTP, TCP, ICMP, Others);
		}
	};
	return protocolParse;
});

dataParsingServices.factory('attackerDistribuService', function(){
	var attackerDistribuParse = {
		attackerDistribuParse: function(attackerData){
			var ipResults = [];
			var ipWithValueResults = [];
			for(var i = 0; i < attackerData.length; i++){
				ipResults.push(attackerData[i].IP);
				ipWithValueFormat = {"value":attackerData[i].Source.PacketNumber, "name":attackerData[i].IP};
				ipWithValueResults.push(ipWithValueFormat);
			}
			top10IpDistribu(ipResults, ipWithValueResults);
		}
	};
	return attackerDistribuParse;
});

dataParsingServices.factory('sendReceiveCountService', function(){
	var sendReceiveParse = {
		sendReceiveParse: function(){

		}
	};
	return sendReceiveParse;
});
*/



// Parsing for ip distribution functions
function parseForNormal(normalData){
	var result = [];
	for(var i = 0; i < normalData.length; i++){
    	var normalFormat = [{"name":normalData[i].source}, {"name":normalData[i].destination}];
    	result.push(normalFormat);
    }
    return result;
}


function parseForGeo(geoLocation){
	var result = {};
	for(var i = 0; i < geoLocation.length; i++){
		var geoCoor = [geoLocation[i].longitude, geoLocation[i].lantitude];
		result[geoLocation[i].ip] = geoCoor;
	}
	return result;
}


function parseForAttack(attackData){
	var result = [];
	for(var i = 0; i < attackData.length; i++){
    	var attackFormat = [{"name":attackData[i].source}, {"name":attackData[i].destination, "value":attackData[i].value}];
    	result.push(attackFormat);
    }
    return result;
}


function parseForVictim(victimData){
	var result = [];
	for(var i = 0; i < victimData.length; i++){
    	var victimFormat = {"name":victimData[i].destination, "value":victimData[i].value};
    	result.push(victimFormat);
    }
    return result;
}

//Parsing for protocol distribution
function parseForProtocolResult(protocol){
    var result = [];
    for(key in protocol){
        var keyValue = key;
        if(key == "x"){
            continue;
        }else{
            protocolFormat = {"value":protocol[keyValue], "name":keyValue};
            result.push(protocolFormat);
        }
    }
    return result;
}

function parseForProtocolName(protocol){
    var result = [];
    for(key in protocol){
        if(key == "x"){
            continue;
        }else{
            result.push(key);
        }
    }
    return result;
}

//Parsing for IP address analysis
function parseForIp(attackData){
	var result = [];
	for(var i = 0; i < attackData.length; i++){
		result.push(attackData[i].IP);
	}
	return result;
}

function parseForIpWithVal(attackData){
	var result = [];
	for(var i = 0; i < attackData.length; i++){
		ipWithValueFormat = {"value":attackData[i].Source.PacketNumber, "name":attackData[i].IP};
		result.push(ipWithValueFormat);
	}
	return result;
}

//Parsing for sucessfully trained model
function getSucesTrainedModel(taskRecords){
	var successfulTasksDict = [];
	for(var i = 0; i < taskRecords.length; i++){
		if(taskRecords[i].status == "Success"){
			successfulTasksDict.push(taskRecords[i]);
		}
	}
	console.log(successfulTasksDict);
	return	successfulTasksDict;
}


function getGerneralParams(rawData){
	var parsedData = [];
	for(keyValue in rawData){
		if(keyValue != "__v" && typeof rawData[keyValue] != 'object' && keyValue != "$$hashKey"){
			parsedData.push({
				key:keyValue,
				value:rawData[keyValue],
			});
		}
	}
	return parsedData;
}


function getModelParams(rawData){
	var parsedData = {};
	for(key in rawData){
		//console.log(typeof rawData[key] == 'object');
		if(typeof rawData[key] == 'object'){
			parsedData = rawData[key];
		}
	}
	return parsedData;
}

//Dashboard page parsing


	