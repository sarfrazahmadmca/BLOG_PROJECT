 "use strict";

 App.controller('GradeListCtrl', function ($scope, apiCall, $dialog, $http) {

    var type = {
        type: 'grade'
    };


     $scope.grades = apiCall.get(type);

     $scope.open = function () {
         $scope.addGradeModal = true;
     };

     $scope.close = function () {
         $scope.addGradeModal = false;
     };


     $scope.e_open = function (g, index) {
         $scope.editGradeModal = true;         
         $scope.E_gradeName = g.name;
         $scope.E_gradeCode = g.code;
         $scope.E_gradeId = g.id;
     };

     $scope.e_close = function () {
         $scope.editGradeModal = false;
     };

     $scope.opts = {
         backdropFade: true,
         dialogFade: true
     };

     $scope.orderProp = 'code';

     $scope.addGrade = function () {

         var newGrade = {
             'name': $scope.C_gradeName,
             'code': $scope.C_gradeCode,
         }

         newGrade = apiCall.post(type, newGrade);
         $scope.grades.objects.push(newGrade);
         $scope.C_gradeName = " ";
         $scope.C_gradeCode = " ";
         $scope.addGradeModal = false;
     };

     $scope.removeItem = function (data, id, index) {
         var grades = $scope.grades;
         var grade = data;
         var msgbox = $dialog.messageBox('Delete Item', 'Are you sure?', [{
                     label: 'Yes, I\'m sure',
                     result: 'yes'
                 }, {
                     label: 'Nope',
                     result: 'no'
                 }
             ]);
         msgbox.open().then(function (result) {
             if (result === 'yes') {
                 apiCall.del(type, {
                         id: id
                     }, function () {
                         grades.objects.splice(grades.objects.indexOf(grade), 1);
                     });
             }
         });
     };

     $scope.editGrade = function () {
         
         var x = $scope.grades.objects;
         var E_Grade = {
             'name': $scope.E_gradeName,
             'code': $scope.E_gradeCode,
         };

         var z = $scope.E_gradeId;

         for (var i in x) {
             var y = x[i];
             if (y.id === z) {

                 y.name = $scope.E_gradeName;
                 y.code = $scope.E_gradeCode;
                 $http.put('/api/v1/' + type.type + '/' + z + '/', E_Grade);

             }
         }
         $scope.editGradeModal = false;

     }

 });