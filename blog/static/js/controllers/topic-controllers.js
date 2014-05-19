"use strict";

 App.controller('TopicListCtrl', function ($scope, apiCall, $dialog, $http) {
     
     window.MY_SCOPE = $scope;
     
    var type = {
        type: 'topic'
    };

     
     $scope.topics = apiCall.get(type);

     $scope.open = function () {
         $scope.addTopicModal = true;
     };
     $scope.close = function () {
         $scope.addTopicModal = false;
     };
     //list=[]
//for data in syllabus
// o=<option value=data.id>data.name</option>
//list.append(o)

     $scope.e_open = function (t, index) {
         $scope.editTopicModal = true;
         $scope.E_topicCode = t.code;
         $scope.E_topicName = t.name;
         $scope.E_topicSyllabus = t.syllabus.named;
         $scope.E_topicParent = t.parent;
     };

     $scope.e_close = function () {
         $scope.editTopicModal = false;
     };

     $scope.opts = {
         backdropFade: true,
         dialogFade: true
     };

     $scope.orderProp = 'code';

     $scope.addTopic = function () {

         var newTopic = {
             'code': $scope.C_topicCode,
             'name': $scope.C_topicName,
             'syllabus': $scope.C_topicSyllabus,
             'parent': $scope.C_topicParent 
         }

         newTopic = apiCall.post(type, newTopic);
         $scope.topics.objects.push(newTopic);
         $scope.C_topicCode = " ";
         $scope.C_topicName = " ";
         $scope.C_topicSyllabus = " ";
         $scope.C_topicParent = " ";
         $scope.addTopicModal = false;
     };

     $scope.removeItem = function (data, id, index) {
         var topics = $scope.topics;
         var topic = data;
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
                         topic.objects.splice(topics.objects.indexOf(topic), 1);
                     });
             }
         });
     };

     $scope.editTopic = function () {
         var x = $scope.topic.objects;
         var E_Topic = {
             'code': $scope.E_topicCode,
             'name': $scope.E_topicName,
             'syllabus': $scope.E_topicSyllabus,
             'parent': $scope.E_topicParent
         };

         var z = $scope.E_topicId;

         for (var i in x) {
             var y = x[i];
             if (y.id === z) {

		 y.code = $scope.E_topicCode;
                 y.name = $scope.E_topicName;
                 y.syllabus = $scope.E_syllabus;
                 y.parent = $scope.E_parent;
                 $http.put('/api/v1/' + type.type + '/' + z + '/', E_Topic);

             }
         }
         $scope.editTopicModal = false;

     }
     
     $scope.addQuestion = function(id){
                 
          alert('addQuestion method is called'+id)  
          /*$('#addQuestionsModal').append(   '<form novalidate>'+
                                            '<input type="hidden" id="id_topic" name="topic" value='+id+' />'+
                                            '<label for="id_question_text">Question text:</label>'+'<input id="id_question_text" maxlength="200" name="question_text" type="text" />'+
                                            '<label for="id_question_type">Question type:</label>'+'<select id="id_question_type" name="question_type">'+
                                            '<option value="" selected="selected">---------</option>'+
                                            '<option value="MCQ">multiple choice</option>'+
                                            '<option value="FIB">fill in the blanks</option>'+
                                            '<option value="NUM">numerical questions</option>'+
                                            '</select>'+
                                            '<label for="id_difficulty_level">Difficulty level:</label>'+
                                            '<select id="id_difficulty_level" name="difficulty_level">'+
                                            '<option value="" selected="selected">---------</option>'+
                                            '<option value="89">L:Low</option>'+
                                            '<option value="90">M:Medium</option>'+
                                            '<option value="91">H:Hard</option>'+
                                            '<option value="92">S:Simpler</option>'+
                                            '</select>'+
                                            '<label for="id_explanation">Explanation:</label>'+'<input id="id_explanation" maxlength="200" name="explanation" type="text" />'+
                                            '<label for="id_hint">Hint:</label>'+'<input id="id_hint" maxlength="200" name="hint" type="text" />'+
                                            '<button ng-click="createQuestion()" class="btn btn-primary">Save</button>'+
                                            '</form>'
                                            
            );*/
            //$("#id_topic").val(id);
            $scope.addQuestionModal = true;
            $scope.id_topic = id;
            
            
            //$scope.addQuestionsModal = true;
  
     };

     $scope.createQuestion = function(){
        alert('I am from createQuestion method')
        var test = $scope.id_question_text;
        alert(test)
        var data = JSON.stringify({'difficulty_level': "/api/v1/difficultylevel/"+$scope.id_difficulty_level+"/", 
            'explanation': $scope.id_explanation, 
            'hint': $scope.id_hint,             
            'question_text': $scope.id_question_text,
            'question_type': $scope.id_question_type,       
            'topic': "/api/v1/topic/"+$scope.id_topic+"/",                   
        })

        $.ajax({
                url: '/api/v1/question/',
                type: 'POST',
                contentType: 'application/json',
                data: data,
                dataType: 'json',
                processData: false,
        
       }) 
       $scope.addQuestionModal = false; 
    }   

    $scope.addQuestions = function(id){
    $.ajax((
            window.location = "/quiz/addquestions/"+id 
        ))
    }
 
});


