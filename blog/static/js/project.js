'use strict';

var App = angular.module('alpLM', ['tastypieModule', 'globalErrors', 'ui.bootstrap','ngResource']);

App.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});

App.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';


    }
]);

App.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.headers.patch = {
        'Content-Type': 'application/json;charset=utf-8'
    }
}])

App.controller('MyController',function($scope){
	$scope.person={'name':'sarfraz'}
	$scope.sel2 = document.createElement("select");
	$scope.select=document.createElement('select');
});

angular.module('App.services',[]).
	factory('myservice',function(){
		var serviceInstance={}
		return serviceInstance;

	});



