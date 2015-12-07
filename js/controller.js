//var baiduApp = angular.module('baiduApp', ['baiduServices']);

/*
baiduApp.controller('mapCtrl', ['$scope', 'test', function($scope, baidu){
	$scope.data = baidu.query();
	//console.log($scope.data);
	//draw($scope.data);
}]);
*/
///////////////////http://10.227.119.213:8088/api/map/563bf7e89886e22878f0f9b6
var deepDefenseControllers = angular.module('deepDefenseControllers', []);
//var baiduApp = angular.module('baiduApp', []);
/*
deepDefenseControllers.controller('mapCtrl', function ($scope, $http) {
  $http.get('http://10.227.119.213:8088/api/map/5640bede9886e2074f2540be').success(function(data) {

  
    	$scope.normalArray = parseForNormal(data.normalDS);
    	$scope.geoArray = parseForGeo(data.geoData);
    	$scope.attackArray = parseForAttack(data.attackDS);
    	$scope.victimArray = parseForVictim(data.victimData);
    	draw($scope.normalArray.splice(0,30), $scope.geoArray, $scope.attackArray.splice(0,30), $scope.victimArray.splice(0,2));
  });
});*/
deepDefenseControllers.controller('dashboardCtrl', function(getCurtStatusService, $scope){
    $scope.naviToView = function(parameter){
        passDataService.set(parameter);
        console.log(parameter); 
    }

    $scope.getCurtStatus = function(){
        getCurtStatusService.get().success(function(data){
            var successCnt = 0, failCnt = 0, runningCnt = 0;
            for(var i = 0; i < data.length; i++){
                if(data[i].status == "failed"){
                    failCnt++;
                }else if(data[i].status == "Success"){
                    successCnt++;
                }else if(data[i].status == "running"){
                    runningCnt++;
                }
            }
            $scope.sucCnt = successCnt;
            $scope.faCnt = failCnt;
            $scope.runCnt = runningCnt;
            $scope.dbTaskRecords = {
                options:data,
                selected:null,
            };
        //Get the number of records AND detailed records info to show them on dashboard
        //If clicked anything about "running(or processing)", go to the parameter table page
        //If clicked anything about "finished(or completed)", go to the analysis page
        })    
    };
});



deepDefenseControllers
    .controller('mapCtrl', function(getSuccessfulTaskService,fetchResultsService,$scope,$location){
        
        $scope.spinnerHide = true;
        $scope.attackSource = true;
        $scope.averagePacket = true;
        $scope.protocolAnalysis = true;
        $scope.top10Ip = true;
        $scope.top10SendReceive = true;
        $scope.loadHide = true;
        /*
        $scope.ipDistribuHide = true;
        $scope.averagePacketRateHide = true;
        $scope.normalProtocolDistribuHide = true;
        $scope.attackProtocolDistribuHide = true;
        $scope.top10IpDistribuHide = true;
        */ 

        $scope.getSuccessTask = function(){
            getSuccessfulTaskService.get().success(function(data){
                $scope.sucTask = {
                    selected:null,
                    options:data,
                };
            })
        }


        $scope.getResults = function(){
            fetchResultsService.get($scope.sucTask.selected._id).success(function(data){
                //Map parameters
                $scope.normalArray = parseForNormal(data.Map.normalDS);
                $scope.geoArray = parseForGeo(data.Map.geoData);
                $scope.attackArray = parseForAttack(data.Map.attackDS);
                $scope.victimArray = parseForVictim(data.Map.victimData);
                
                //Average Packet Bytes parameters
                $scope.normalX = data.AveragePacketRate.normal_X;
                $scope.normalY = data.AveragePacketRate.normal_Y;
                $scope.attackX = data.AveragePacketRate.attack_X;
                $scope.attackY = data.AveragePacketRate.attack_Y;

                //Protocol Analysis parameters(normal)
                $scope.NchartTitle = "Normal";
                $scope.NprotocolNames = parseForProtocolName(data.ProtocolDistribution.normal);
                $scope.NprotocolResults = parseForProtocolResult(data.ProtocolDistribution.normal);
                $scope.NxAxis = data.AverageProtocolRate.normal.X;
                $scope.NUDP = data.AverageProtocolRate.normal.UDP;
                $scope.NHTTP = data.AverageProtocolRate.normal.HTTP;
                $scope.NTCP = data.AverageProtocolRate.normal.TCP;
                $scope.NICMP = data.AverageProtocolRate.normal.ICMP;
                $scope.Nothers = data.AverageProtocolRate.normal.others;

                //Protocol Analysis parameters(attack)
                $scope.AchartTitle = "Attack";
                $scope.AprotocolNames = parseForProtocolName(data.ProtocolDistribution.attack);
                $scope.AprotocolResults = parseForProtocolResult(data.ProtocolDistribution.attack);
                $scope.AxAxis = data.AverageProtocolRate.attack.X;
                $scope.AUDP = data.AverageProtocolRate.attack.UDP;
                $scope.AHTTP = data.AverageProtocolRate.attack.HTTP;
                $scope.ATCP = data.AverageProtocolRate.attack.TCP;
                $scope.AICMP = data.AverageProtocolRate.attack.ICMP;
                $scope.Aothers = data.AverageProtocolRate.attack.others;

                //Top10IPDistribu
                $scope.IPAddrs = parseForIp(data.BehaviorOfTopIP.attackBehaviorOfSource);
                $scope.IPWithVal = parseForIpWithVal(data.BehaviorOfTopIP.attackBehaviorOfSource);


                $scope.ipDistribuRefresh = function(){
                    $scope.ipDistribuHide = false;
                    draw($scope.normalArray.slice(0, 50), $scope.geoArray, $scope.attackArray.slice(0, 50), $scope.victimArray);
                }
                $scope.avgPacketRateRefresh = function(){
                    $scope.averagePacketRateHide = false;
                    averagePacketRate($scope.normalX.slice(0,100),$scope.normalY.slice(0,100),$scope.attackX.slice(0,100),$scope.attackY.slice(0,100));
                }
                $scope.normalProtocolRefresh = function(){
                    $scope.normalProtocolDistribuHide = false;
                    protocolDistriAnalysis($scope.NchartTitle, $scope.NprotocolNames, $scope.NprotocolResults, $scope.NxAxis, $scope.NUDP, $scope.NHTTP, $scope.NTCP, $scope.NICMP, $scope.Nothers);
                }
                $scope.attackProtocolRefresh = function(){
                    $scope.attackProtocolDistribuHide = false;
                    protocolDistriAnalysis($scope.AchartTitle, $scope.AprotocolNames, $scope.AprotocolResults, $scope.AxAxis, $scope.AUDP, $scope.AHTTP, $scope.ATCP, $scope.AICMP, $scope.Aothers);
                }
                $scope.top10AttackerRefresh = function(){
                    $scope.top10IpDistribuHide = false;
                    top10IpDistribu($scope.IPAddrs, $scope.IPWithVal);
                }
            })
        };

/*
    .directive("scroll", function ($window) {
        return function($scope, element, attrs) {
                angular.element($window).bind("scroll", function() {
                if (this.pageYOffset >= 200 && $scope.Ashown != true) {
                    if($scope.normalArray != null){
                        $scope.attackSource = false;
                        //draw($scope.normalArray.slice(0, 50), $scope.geoArray, $scope.attackArray.slice(0, 50), $scope.victimArray);
                        $scope.Ashown = true;

                    }else{
                        $scope.spinnerHide = false;
                    }
                } else if(this.pageYOffset > 360 && $scope.Bshown != true){
                    if($scope.normalX != null){
                        $scope.spinnerHide = false;
                        $scope.averagePacket = false;
                        averagePacketRate($scope.normalX,$scope.normalY,$scope.attackX,$scope.attackY);
                        $scope.Bshown = true;
                    }
                } else if(this.pageYOffset > 900 && $scope.Cshown != true){
                    if($scope.NprotocolNames != null){
                        $scope.protocolAnalysis = false;
                        $scope.top10Ip = false;
                        protocolDistriAnalysis($scope.NchartTitle, $scope.NprotocolNames, $scope.NprotocolResults, $scope.NxAxis, $scope.NUDP, $scope.NHTTP, $scope.NTCP, $scope.NICMP, $scope.Nothers);
                        protocolDistriAnalysis($scope.AchartTitle, $scope.AprotocolNames, $scope.AprotocolResults, $scope.AxAxis, $scope.AUDP, $scope.AHTTP, $scope.ATCP, $scope.AICMP, $scope.Aothers);
                        $scope.Cshown = true;
                    }else{
                        $scope.spinnerHide = false;
                    }
                }  else if(this.pageYOffset > 1600 && $scope.Dshown != true){
                    if($scope.AprotocolNames != null){
                        top10IpDistribu($scope.IPAddrs, $scope.IPWithVal);
                        $scope.Dshown = true;
                    }else{
                        $scope.spinnerHide = false;
                    }
                }   else if(this.pageYOffset > 2300 && $scope.Eshown != true){
                    if($scope.IPAddrs != null){
                        $scope.Eshown = true;
                        $scope.top10SendReceive = false;
                    }else{
                        $scope.spinnerHide = false;
                    }
                }  
                $scope.$apply();
            });
        };*/
});


deepDefenseControllers.controller('getParametersCtrl', function($scope, getCurtStatusService){

    $scope.detailedParamsTableHide = true;
    $scope.generalParamsTableHide = true;
    $scope.getCurtStatus = function(){
        getCurtStatusService.get().success(function(data){
          $scope.taskForChecking = {
            selected:null,
            options:data,
        };
        //Get the number of records AND detailed records info to show them on dashboard
        //If clicked anything about "running(or processing)", go to the parameter table page
        //If clicked anything about "finished(or completed)", go to the analysis page
        //console.log($scope.taskForChecking.selected);
        })
        //$scope.dataForPassing = passDataService.get();
        //console.log(passDataService.get());
        //$scope.taskForChecking.selected = passDataService.get();
    };
    $scope.getParams = function(){
        $scope.detailedParamsTableHide = true;
        $scope.generalParamsTableHide = false;
        $scope.checkGerneralParams = getGerneralParams($scope.taskForChecking.selected);
        console.log($scope.checkGerneralParams);
        if($scope.taskForChecking.selected.type == "train"){
            $scope.detailedParamsTableHide = false;
            $scope.checkDetailedParams = getModelParams($scope.taskForChecking.selected);
        }
    }
});



deepDefenseControllers.controller('trainCtrl', function($scope, $location, trainService, getDatasetService){
        /*getDatasetService.get().success(function(response){
            $scope.attackDataset = {
                selected:null,
                options:response[0].CAIDAAttack,
            };
            $scope.normalDataset = {
                selected:null,
                options:response[0].CAIDANormal,
            };
        })*/


        $scope.attackDataset = {
            selected:null,
            options:null,
        };
        $scope.normalDataset = {
            selected:null,
            options:null,
        };
        $scope.trainDatasetHide = true;



            $scope.getDataSet = function(){
                    getDatasetService.get().success(function(response){
                    $scope.trainDatasetHide = false;
                    $scope.attackDataset = {
                        selected:null,
                        options:response[0].CAIDAAttack,
                    };
                    $scope.normalDataset = {
                        selected:null,
                        options:response[0].CAIDANormal,
                    };
                })
           } 

           $scope.submit = function(){
 
                var requestBody = [
                    //keras-LSTM params
                    {
                        engine: $scope.userEngine,
                        model: $scope.userModel,
                        attack: $scope.attackDataset.selected,
                        normal: $scope.normalDataset.selected,
                        sequence: $scope.userSequence,
                        innerActivation: $scope.innerActivation,
                        activation: $scope.activation,
                        percentage: $scope.userPercentage,
                        validation: $scope.userValidation,
                        dropOut: $scope.userDropOut,
                        lossFunction: $scope.lossFunction,
                        classMode: $scope.classMode,
                        finalActivationFunction: $scope.finalActivationFunction,
                        windowSize: $scope.userWinSize,
                        windowStep: $scope.userStep,
                        threshold: $scope.userThreshold,
                        outputDimension: $scope.userOutputDimension,
                        epoch: $scope.userEpoch,
                        batchSize: $scope.userBatchSize
                    },

                    //keras-CNN params
                    {
                        engine: $scope.userEngine,
                        model: $scope.userModel,
                        attack: $scope.attackDataset.selected,
                        normal: $scope.normalDataset.selected,
                        dataLength: $scope.userDataLength,
                        filterLength: $scope.userFilterLength,
                        dataWidth: $scope.userDataWidth,
                        filterWidth: $scope.userFilterWidth,
                        dataDepth: $scope.userDataDepth,
                        numberOfFilters: $scope.userNumberOfFilters,
                        trainingEpochs: $scope.userTrainEpochs,
                    },


                    //mllib-SVM params
                    {
                        engine: $scope.userEngine,
                        model: $scope.userModel,
                        attack: $scope.attackDataset.selected,
                        normal: $scope.normalDataset.selected,
                        SVMIteration: $scope.SVMIteration,
                        step: $scope.userStep,
                        regParam: $scope.userRegParam,
                        regType: $scope.userRegType,
                    }, 

                    //mllib-Decision tree params
                    {
                        attack: $scope.attackDataset.selected,
                        normal: $scope.normalDataset.selected,
                        numberOfClasses: $scope.numOfClasses,
                    },

                    //mllib-logisticRegression params
                    {
                        attack: $scope.attackDataset.selected,
                        normal: $scope.normalDataset.selected,
                        engine: $scope.userEngine,
                        model: $scope.userModel,
                        logiIteration: $scope.logiIteration,
                    },

                    /*Common params
                    {
                        engine: $scope.userEngine,
                        model: $scope.userModel,
                        attack: $scope.attackDataset.selected,
                        normal: $scope.normalDataset.selected,
                    }*/
                ];
                console.log(requestBody[0]);
                if($scope.submitFrom == 'LSTM'){
                    userRequestBody = requestBody[0];
                }else if($scope.submitFrom == 'CNN'){
                    userRequestBody = requestBody[1];
                }

                trainService.post(userRequestBody).success(function(response){
                    $location.path('/dashboard');
                    console.log(response);
                    if (true) {
                        //Go to dashboard page 
                    }else{
                        //Alert fail
                    };
                })
           }   
   /* */
});

deepDefenseControllers.controller('testCtrl', function($scope, $location, getTrainedModelService, testService, getDatasetService) {
    $scope.generalParamsHide = true;
    $scope.detailedParamsHide = true;
    $scope.attackDataForTest = {
        selected:null,
        options:null,
    };
    $scope.normalDataForTest = {
        selected:null,
        options:null,
    };

    $scope.testDatasetHide = true;
    $scope.trainedModelHide = true;
    //This controller will provide two functionalities---
    //1. Get trained models and all relative parameters 
    //2. Post request to the server to ask for a test operation


    $scope.getTrainedModel = function(){
            getTrainedModelService.get().success(function(data){
            $scope.trainedModelHide = false;
            $scope.sucesTrainedModel = {
                selected:null,
                options:getSucesTrainedModel(data),
            };
            console.log(data);
        })    
    }

    $scope.loadParamsTable = function(){
        $scope.generalParams = getGerneralParams($scope.sucesTrainedModel.selected);
        $scope.modelParams = getModelParams($scope.sucesTrainedModel.selected);
        $scope.generalParamsHide = false;
        $scope.detailedParamsHide = false;
    }

    $scope.getDataSet = function(){
            getDatasetService.get().success(function(response){
            $scope.testDatasetHide = false;
            $scope.attackDataset = {
                selected:null,
                options:response[0].CAIDAAttack,
            };
            $scope.normalDataset = {
                selected:null,
                options:response[0].CAIDANormal,
            };
        })
    } 
    $scope.postTestRequest = function(){
        var requestBody = {
            trainModelId: $scope.sucesTrainedModel.selected._id,
            engine: $scope.sucesTrainedModel.selected.engine,
            model: $scope.sucesTrainedModel.selected.model,
            attack: $scope.attackDataForTest.selected,
            normal: $scope.normalDataForTest.selected,
            windowSize: $scope.testWinSize,
            batchSize: $scope.testBatchSize,
            step: $scope.testStep,
            threshold: $scope.testThreshold,
        };
        console.log(requestBody);
        testService.post(requestBody).success(function(response){
            console.log(response);
            if(true){
                $location.path('/dashboard');
                //Go to dashboard page
            }else{
                //Alert fail
            };
        })
    };
});

/*
function passData(){
    var myData = [];
    var addData = function(userData){
        myData.push(userData);
    }
    var getData = function(){
        return myData;
    }
    return {
        addData: addData,
        getData: getData,
    };
}

*/