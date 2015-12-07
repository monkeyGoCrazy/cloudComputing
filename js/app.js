var deepDefenseApp = angular.module('deepDefenseApp', ['ngRoute', 'deepDefenseControllers', 'restfulServices', 'dataParsingServices']);

deepDefenseApp.config(function($routeProvider) {
	$routeProvider

	.when('/', {
		templateUrl:'Pages/dashboard.html',
		controller:'dashboardCtrl'
	})
	.when('/analysis', {
		templateUrl:'Pages/analysis.html',
		controller:'mapCtrl'
	})
	.when('/tables', {
		templateUrl:'Pages/tables.html',
		//controller:
	})	
	.when('/dashboard', {
		templateUrl:'Pages/dashboard.html',
		controller:'dashboardCtrl'
	})
	.when('/train', {
		templateUrl:'Pages/train.html',
		controller:'trainCtrl'
	})
	.when('/test', {
		templateUrl:'Pages/test.html',
		controller:'testCtrl'
	})
	.when('/keras', {
		templateUrl:'Pages/trainEngines/keras.html',
		controller:'trainCtrl'
	})	
	.when('/mllib', {
		templateUrl:'Pages/trainEngines/mllib.html',
		controller:'trainCtrl'
	})
	.when('/LSTM', {
		templateUrl:'Pages/trainModels/LSTM.html',
		controller:'trainCtrl'
	})
	.when('/CNN', {
		templateUrl:'Pages/trainModels/CNN.html',
		controller:'trainCtrl'
	})
	.when('/logisticRegression', {
		templateUrl:'Pages/trainModels/logisticRegression.html',
		controller:'trainCtrl'
	})	
	.when('/SVM', {
		templateUrl:'Pages/trainModels/SVM.html',
		controller:'trainCtrl'
	})
	.when('/naiveBayes', {
		templateUrl:'Pages/trainModels/naiveBayes.html',
		controller:'trainCtrl'
	})
	.when('/decisionTree', {
		templateUrl:'Pages/trainModels/decisionTree.html',
		controller:'trainCtrl'
	});
});