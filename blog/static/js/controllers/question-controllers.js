function addQuestion(){
  topic = $("#id_topic").val();
  question_text = $("#id_question_text").val();
  difficulty_level = $("#id_difficulty_level").val();
  explanation = $("#id_explanation").val();
  hint = $("id_hint").val();

  
    var data = JSON.stringify({'topic' : '/api/v1/topic/'+topic+'/',
              'question_text' : question_text,
              'difficulty_level' : '/api/v1/difficultylevel/'+difficulty_level+'/',
              'explanation' : explanation,
              'hint' : hint
  })

$.ajax({
  url: '/api/v1/question/',
  type: 'POST',
  contentType: 'application/json',
  data: data,
  dataType: 'json',
  processData: false,
  error: function(data){    
     alert(data)
    },
    success: function(data){
      alert("success")
      window.location = "/quiz/question/"
    }
})  
  
}

function deleteQuestion(id){
  
  var data = JSON.stringify({'id' : id })
  $.ajax({
    url: '/api/v1/question/'+id +'/',
    type: 'DELETE',
    contentType: 'application/json',
    dataType: 'json',
    processData: false,
    error: function(data){    
    },
    success: function(data){
      window.location = "/quiz/question/"
    }
  })
}

function getQuestion(){
  id = $("#id_id").val();
  $.ajax({
    url: '/api/v1/question/'+id +'/',
    type: 'GET',
    contentType: 'application/json',
    dataType: 'json',
    processData: false,
    error: function(data){      
    },
    success: function(data){
     
    }    
  })

}

function updateQuestion(id){
  
  topic = $("#id_topic").val();
  question_text = $("#id_question_text").val();
  difficulty_level = $("#id_difficulty_level").val();
  explanation = $("#id_explanation").val();
  hint = $("#id_hint").val();

  
    var data = JSON.stringify({'topic' : '/api/v1/topic/'+topic+'/',
              'question_text' : question_text,
              'difficulty_level' : '/api/v1/difficultylevel/'+difficulty_level+'/',
              'explanation' : explanation,
              'hint' : hint
  })
  $.ajax({
    url: '/api/v1/question/'+id,
    type: 'PUT',
    contentType: 'application/json',
    data: data,
    dataType: 'json',
    processData: false,
    error: function(data){    
    },
    success: function(data){
      //alert(data);
      window.location = "/quiz/question/"
    }
  });
    
}

function editQuestion(id){
  $.ajax({
          url:'/quiz/showquestion/'+id+'/',
          success:function(data){

              $("#editQuestionForm").html(data)

          }

  });
}

function addQuestionForm(){
$.ajax({
        url:'/quiz/newquestion/',
        success:function(data){
              //alert(data);
              $("#questionForm").html(data)

        }

})

}

function cancel(){
  window.location = "/quiz/question/"
}