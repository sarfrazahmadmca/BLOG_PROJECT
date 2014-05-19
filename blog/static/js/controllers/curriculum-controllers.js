
 "use strict";

 App.controller('CurriculumListCtrl', function ($scope, apiCall, $dialog, $http) {
    
     var type = {
        type: 'curriculum'
    };
     
     
    
     var type2 = {

        type:'country'
     }
     
     
     $scope.curricula = apiCall.get(type);
     $scope.countries = apiCall.get(type2);

     $scope.opts = {
	 backdropFade: true,
	 dialogFade:true
     };
 
     $scope.e_open = function(s,index){
	 $scope.editCurriculumModel = true;
	 $scope.E_CurriculumName = s.name;
	 $scope.E_CurriculumCode = s.code;
	 $scope.E_CurriculumCountry = s.country.name;
	 $scope.getState(s.country.id);
	 $scope.country_name = s.country.id;
	 $scope.counter=0;
	 $scope.expect($scope.counter).toEqual(0);
	 
	 
	 $scope.watch(country_name,function(newVal,oldval){
	     $scope.counter = $scope.counter+1;
	     console.log($scope.counter);
	 });
	 $scope.E_CurriculumState = s.state.name;
     };

     $scope.close = function(){
	 $scope.editCurriculumModel = false;
     };
     
     $scope.selected = undefined;

     $scope.getState = function(code){
	 $http({method:'GET',url:'/api/v1/territory/?country='+code+'&format=json'}).success(function(data){
	     $scope.states=data;
	     console.log($scope.states.meta.next);
	 });
     };
	 


     
     // http://localhost:8000/api/v1/territory/?country=356&format=json
     // here we get stuff by means of id?
     
     
     
 
 });

