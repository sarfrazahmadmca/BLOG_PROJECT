function addQuizSetting(){
    code = $("#id_code").val()
    name = $("#id_name").val();
    introduction = $("#id_introduction").val();

    // no_of_questions = $("#id_no_of_questions").val();
    preferred_grading_behaviour = $("#id_preferred_grading_behaviour").val();
    
    attempt_hint = $("#id_attempt_hint").val();
    attempt_explanation = $("#id_attempt_explanation").val();                                                     
    attempt_new_quiz = $("#id_attempt_new_quiz").val();                                    
    attempts_allowed = $("#id_attempts_allowed").val(); 
    review_attempt = $("#id_review_attempt").val();     
    review_correct_answer = $("#id_review_correct_answer").val();
    review_explanation = $("#id_review_explanation").val(); 
    examiner_feedback = $("#id_examiner_feedback").val();
    passing_percentage = $("#id_passing_percentage").val();
    shuffle_questions = $("#id_shuffle_questions").val();
    shuffle_answers =  $("#id_shuffle_answer").val();
    timed_quiz = $("#id_timed_quiz").val();
    time_limit = $("#id_time_limit").val();
    dated_quiz = $("#id_dated_quiz").val();
    quiz_start_date = $("#id_quiz_start_date").val();
    quiz_end_date = $("#id_quiz_end_date").val();
    var data=JSON.stringify({"code" : code,
    "name" : name,
    "introduction" : introduction,

    // "no_of_questions" : no_of_questions,

    "preferred_grading_behaviour" : '/api/v1/gradingbehaviour/'+preferred_grading_behaviour+'/',
    "attempt_hint" : attempt_hint,
    "attempt_explanation" : attempt_explanation,
    "attempt_new_quiz" : attempt_new_quiz,
    "attempts_allowed" : attempts_allowed,
    "review_attempt" : review_attempt,
    "review_correct_answer" : review_correct_answer,
    "review_explanation" : review_explanation,
    "examiner_feedback" : examiner_feedback,
    "passing_percentage" : passing_percentage,
    "shuffle_questions" : shuffle_questions,
    "shuffle_answers" :  shuffle_answers,
    "timed_quiz" : timed_quiz,
    "time_limit" : time_limit,
    "dated_quiz" : dated_quiz,
    "quiz_start_date" : quiz_start_date,
    "quiz_end_date" : quiz_end_date
                          })

    $.ajax({
          url: '/api/v1/quizsetting/',
          type: 'POST',
          data:data,
          contentType: 'application/json',
          dataType: 'json',
          processData:false,
          error: function(data){    
    },
    success: function(data){
      alert("created successfully")
      window.location = "/quiz/quizsetting/"
    }

    });
}                    
     
    

function deleteQuizSetting(id){
  
  var data = JSON.stringify({'id' : id })
  $.ajax({
    url: '/api/v1/quizsetting/'+id +'/',
    type: 'DELETE',
    contentType: 'application/json',
    dataType: 'json',
    processData: false,
    error: function(data){    
    },
    success: function(data){
      alert("deleted successfully")
      window.location = "/quiz/quizsetting/"
    }
  })
}

function getQuizSetting(){
  id = $("#id_id").val();
  $.ajax({
    url: '/api/v1/quizsetting/'+id +'/',
    type: 'GET',
    contentType: 'application/json',
    dataType: 'json',
    processData: false,
    error: function(data){      
    },
    success: function(data){
     // $.each($.parseJSON(data), function(key,value){
       // alert(value.name);
     // });
      //$('#div1').html("<input type='text' value="+data.code+data.name);
      //$('#div2').html(data);
      //console.log(data);
      //alert(data.name+":"+data.code);
      window.location = "/quiz/quizsetting/"
      //$("#div1").html(data);
    }    
  })

}

function updateQuizSetting(id){
    code = $("#id_code").val()
    name = $("#id_name").val();
    introduction = $("#id_introduction").val();

    // no_of_questions = $("#id_no_of_questions").val();

    preferred_grading_behaviour = $("#id_preferred_grading_behaviour").val();
    attempt_hint = $("#id_attempt_hint").val();
    attempt_explanation = $("#id_attempt_explanation").val();                                                     
    attempt_new_quiz = $("#id_attempt_new_quiz").val();                                    
    attempts_allowed = $("#id_attempts_allowed").val(); 
    review_attempt = $("#id_review_attempt").val();     
    review_correct_answer = $("#id_review_correct_answer").val();
    review_explanation = $("#id_review_explanation").val(); 
    examiner_feedback = $("#id_examiner_feedback").val();
    passing_percentage = $("#id_passing_percentage").val();
    shuffle_questions = $("#id_shuffle_questions").val();
    shuffle_answers =  $("#id_shuffle_answer").val();
    timed_quiz = $("#id_timed_quiz").val();
    time_limit = $("#id_time_limit").val();
    dated_quiz = $("#id_dated_quiz").val();
    quiz_start_date = $("#id_quiz_start_date").val();
    quiz_end_date = $("#id_quiz_end_date").val();

    //alert(preferred_grading_behaviour);
    
  var data=JSON.stringify({"code" : code,
    "name" : name,
    "introduction" : introduction,

    // "no_of_questions" : no_of_questions,

    "preferred_grading_behaviour" : '/api/v1/gradingbehaviour/'+preferred_grading_behaviour+'/',
    //"preferred_grading_behaviour" : preferred_grading_behaviour,
    "attempt_hint" : attempt_hint,
    "attempt_explanation" : attempt_explanation,
    "attempt_new_quiz" : attempt_new_quiz,
    "attempts_allowed" : attempts_allowed,
    "review_attempt" : review_attempt,
    "review_correct_answer" : review_correct_answer,
    "review_explanation" : review_explanation,
    "examiner_feedback" : examiner_feedback,
    "passing_percentage" : passing_percentage,
    "shuffle_questions" : shuffle_questions,
    "shuffle_answers" :  shuffle_answers,
    "timed_quiz" : timed_quiz,
    "time_limit" : time_limit,
    "dated_quiz" : dated_quiz,
    "quiz_start_date" : quiz_start_date,
    "quiz_end_date" : quiz_end_date
    })
  $.ajax({
    url: '/api/v1/quizsetting/'+id,
    type: 'PUT',
    contentType: 'application/json',
    data: data,
    dataType: 'json',
    processData: false,
    error: function(data){    
      alert('there is an error')
    },
    success: function(data){

      //alert(data.id);
      //alert(data.preferred_grading_behaviour);
      window.location = "/quiz/quizsetting/"
      
    }
  });
    
}

function editQuizSetting(id){
  $.ajax({

         url:'/quiz/showquizsetting/'+id+'/',
        
          success:function(data){          
              $("#div").html(data)

          }

  });
}

function addQuizSettingForm(){
$.ajax({
        url:'/quiz/newquizsetting/',
        success:function(data){
              //alert(data);
              $("#addForm").html(data)

        }

})

}

function cancel(){
  window.location = "/quiz/quizsetting/"
}