var restfulServices = angular.module('restfulServices', []);

restfulServices.factory('getCurtStatusService', function($http){
	//Analysis page services(Fetch charts data included)
	var getStatus = {
		get: function(){
			console.log('dashBoardgetFunctionGetCalled');
			var promise = $http.get("http://10.227.119.213:8085/allTasks").success(function(response) {
				console.log(response);
				return response;
			});
			return promise;
		}
	};	
	return getStatus;
});

restfulServices.factory('fetchResultsService', function($http){
	//Analysis page services(Fetch charts data included)
	var fetchResultService = {
		get: function(taskId){
			console.log(taskId);
			var promise = $http.get("http://10.227.119.213:8085/analysis/" + taskId).success(function(response) {
				console.log(response);
				return response;
			});
			return promise;
		}
	};	
	return fetchResultService;
});


restfulServices.factory('getSuccessfulTaskService', function($http){
	var successfulTaskService = {
		get: function(){
			var promise = $http.get("http://10.227.119.213:8085/analysis").success(function(response){
				return response;
			});
			return promise;
		}
	};
	return successfulTaskService;
});


restfulServices.factory('trainService', function($http){
	//Train page services
	var trainParamService = {
		post: function(requestBody){
			console.log(requestBody)
			var promise = $http.post("http://10.227.119.213:8085/train", requestBody)
				.success(function(response){
					console.log(response);
					return response;
			});
			return promise;
		}
	}; 
	return trainParamService;
});

restfulServices.factory('getTrainedModelService', function($http){
	//Test page services
	//Get all the trained models
	var getModelsService = {
		get: function(){
			var promise = $http.get('http://10.227.119.213:8085/train').success(function(response){
				return response;
			});
			return promise;
		}
	};
	return getModelsService; 
});

restfulServices.factory('testService', function($http){
	//Test page service to post model 
	var testPostService = {
		post: function (requestBody) {
			console.log(requestBody)
			var promise = $http.post("http://10.227.119.213:8085/test", requestBody).success(function(response){
				console.log(response);
				return response;
			});
			return promise;
		}
	}
	return testPostService;
});

restfulServices.factory('getDatasetService', function($http){
	//Both for train and test page service
	//Send the GET request with specific dataset to get detailed dataset(attack data, normal data .etc)
	var datasetService = {
		get: function () {
			var promise = $http.get("http://10.227.119.213:8085/dataset").success(function(response){
				console.log(response)
				return response;
			});
			return promise;
		}
	}
	return datasetService;
});



