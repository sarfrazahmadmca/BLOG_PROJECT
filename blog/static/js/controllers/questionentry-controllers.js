/*function initTinyMce(){
    $(this).tinymce({
                mode : "none",
                theme : "advanced",
                plugins : "spellchecker,preview",
                theme_advanced_buttons1 : "bold,italic,underline,|,sub",
                theme_advanced_buttons2 : "",
                theme_advanced_buttons3 : "",
                theme_advanced_toolbar_location : "top",
                theme_advanced_toolbar_align : "left",
                theme_advanced_statusbar_location : "bottom",
                theme_advanced_resizing : false
    });
  }*/

function addNewQuestion(id,difficultylevels,question_types,question_number){
  //alert("count"+abcd)
  //alert(typeof question_number)
  //question_number = question_number + 1;
  alert("addNewQuestion Method id called"+question_number)
          var difficultyList = "<select id='id_difficulty_level' name='difficulty_level'>";
           for (var x = 0; x < difficultylevels.length ; x++) {
           difficultyList += "<option value="+difficultylevels[x].id+">" + difficultylevels[x].name + "</option>";
           }
           difficultyList += "</select>";

           var questionTypesList = "<select id='id_question_type' name='question_type'>";
            for (var i = 0; i < question_types.length; i++) {
              questionTypesList += "<option value="+question_types[i].id+">" + question_types[i].name + "</option>";
            }
            questionTypesList += "</select>";            
 $('#questions').append('<div id=question_'+question_number+' class = "question">'+    
  '<legend>Question '+(question_number)+'</legend>'+
  '<input type="hidden" id="id_topic" name="topic" value="'+id+'" />'+
  '<div class="control-group">'+
  '<label for="id_question_text" class="control-label">Question text:</label>'+
  '<div class="controls">'+
  '<textarea class="span9" id="id_question_text" rows="3" ></textarea>'+
  '</div>'+
  '</div>'+
  '<div class="control-group">'+
  '<label for="id_difficulty_level">Difficulty Level :</label>'+
  '<div class="controls">'+difficultyList+
  '</div>'+
  '</div>'+
  '<div class="control-group">'+
  '<label for="id_question_type">Question Type :</label>'+
  '<div class="controls">'+questionTypesList+  
  '</div>'+
  '</div>'+  
  '<div class="control-group">'+
  '<label for="id_explanation">Explanation :</label>'+
  '<div class="controls">'+
  '<textarea class="span3" id="id_explanation" rows="3"></textarea>'+
  '</div>'+
  '</div>'+  
  '<div class="control-group">'+
  '<label for="id_hint">Hint :</label>'+
  '<div class="controls">'+
  '<textarea class="span3" id="id_hint" rows="3"></textarea>'+
  '<button onclick="saveQuestion('+question_number+')" class="btn btn-primary">Save Question</button>'+  
  '</div>'+
  '</div>'+      
  '</div>');  
 
}

function saveQuestion(div_id){
  tinyMCE.triggerSave();
  alert("saveQuestion method is called")
  var div = document.getElementById("question_"+div_id);  
  topic = $(div).find('#id_topic').val()
  question_text = $(div).find('#id_question_text').val()
  question_type = $(div).find('#id_question_type').val()
  difficulty_level = $(div).find('#id_difficulty_level').val()
  explanation = $(div).find('#id_explanation').val()
  hint = $(div).find('#id_hint').val()

 // console.log("topic : "+topic+"  question_text : "+question_text+"  question_type :"+question_type+"  difficulty_level : "+difficulty_level+"  explanation : "+explanation+"  hint : "+hint)
  var data = JSON.stringify({'topic' : '/api/v1/topic/'+topic+'/',
              'question_text' : question_text,
              'difficulty_level' : '/api/v1/difficultylevel/'+difficulty_level+'/',
              'question_type' : question_type,
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
      alert("error :"+data)
    },
    success: function(data){
      alert("success");
      
      $("#question_"+div_id +" button").remove();
      $("#question_"+div_id).append('<input type="hidden" id="id_id" name="question" value="'+data.id+'" />'+
                                '<button onclick="addAnswer('+data.id+','+div_id+')" class="btn btn-inverse">Add Choice</button>'+
                                '<button onclick="updateQuestion('+div_id+')" class="btn btn-primary">Update Question</button>'+
                                '<button onclick="deleteQuestion('+div_id+')" class="btn btn-danger">Delete Question</button>');  
      
    }
  });
}

function updateQuestion(div_id){
  tinyMCE.triggerSave();
  console.log("update method is called")  
  var div = document.getElementById("question_"+div_id);
  id = $(div).find('#id_id').val()
  topic = $(div).find('#id_topic').val()
  question_text = $(div).find('#id_question_text').val()
  question_type = $(div).find('#id_question_type').val()
  difficulty_level = $(div).find('#id_difficulty_level').val()
  explanation = $(div).find('#id_explanation').val()
  hint = $(div).find('#id_hint').val()

 
  var data = JSON.stringify({'topic' : '/api/v1/topic/'+topic+'/',
              'question_text' : question_text,
              'difficulty_level' : '/api/v1/difficultylevel/'+difficulty_level+'/',
              'question_type' : question_type,
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
      alert("updated successfully");
      
    }
  });  
}

function deleteQuestion(div_id){
  alert("delete question method is called"+div_id)  
  var div = document.getElementById("question_"+div_id);
  var id = $(div).find('#id_id').val()
  $.ajax({
    url: '/api/v1/question/'+id +'/',
    type: 'DELETE',
    contentType: 'application/json',
    dataType: 'json',
    processData: false,
    error: function(data){    
      alert(data)
      console.log(data)
      $(div).remove();
    },
    success: function(data){
      alert("question deleted successfully")      
      $(div).remove();
    }
  })
}

function addAnswer(qid,div_id){
   alert("addAnswer method is called")  
  var marks = new Array()
    marks[0] = 0;
    marks[1] = 1;
    marks[2] = -0.25;
    marks[3] = -0.33;
  var marksList = "<select id='id_marks' name='marks'>";
  for(var j = 0; j< marks.length ; j++) {
    marksList += "<option value="+marks[j]+">"+marks[j]+"</option>";
   }
  marksList += "</select>"; 
  var div = document.getElementById("question_"+div_id);
  var answers_count = $('#question_'+div_id+' ol').children().length  
  var qid = $(div).find('#id_id').val()
  if(answers_count == 0){
    $('#question_'+div_id).append('<ol type="A"><div id=answer_'+qid+'_'+answers_count+' class="control-group">'+
                          '<div class="controls form-inline">'+
                          '<li>'+
                          '<input id="id_question" value='+qid+' type="hidden" />'+
                          '<label for="id_answer_text">Answer Text:</label>'+
                          '<textarea class="span6" id="id_answer_text" rows="3"></textarea>'+
                          '<label for="id_marks"> Marks :</label>'+marksList+                          
                          '<button onclick="saveAnswer('+qid+','+answers_count+')" class="btn btn-primary">Save Answer</button>'+                          
                          '</li>'+                        
                          '</div>'+
                          '</ol>');

  }
  else{
      $('#question_'+div_id+' ol' ).append('<div id=answer_'+qid+'_'+answers_count+' class="control-group">'+
                          '<div class="controls form-inline">'+
                          '<li>'+
                          '<input id="id_question" value='+qid+' type="hidden" />'+
                          '<label for="id_answer_text">Answer Text:</label>'+
                          '<textarea class="span6" id="id_answer_text" rows="3"></textarea>'+
                          '<label for="id_marks"> Marks :</label>'+marksList+                          
                          '<button onclick="saveAnswer('+qid+','+answers_count+')" class="btn btn-primary">Save Answer</button>'+                          
                          '</li>'+                        
                          '</div>');
    }   
}

function saveAnswer(qid,div_id){
  tinyMCE.triggerSave();
  var div = document.getElementById("answer_"+qid+"_"+div_id); 
  question = $(div).find('#id_question').val()  
  answer_text = $(div).find('#id_answer_text').val() 
  marks = $(div).find('#id_marks').val()
  
 var data = JSON.stringify({'question' : '/api/v1/question/'+question+'/',
              'answer_text' : answer_text,              
              'marks' : marks
  })
  $.ajax({
    url: '/api/v1/answer/',
    type: 'POST',
    contentType: 'application/json',
    data: data,
    dataType: 'json',
    processData: false,
    error: function(data){    
    },
    success: function(data){
     alert("success")
     $("#answer_"+qid+"_"+div_id+" button").remove();
     $("#answer_"+qid+"_"+div_id).append('<input type="hidden" id="answer_id" name="answer" value="'+data.id+'" />'+
                              '<button onclick="updateAnswer('+qid+','+div_id+')" class="btn btn-primary">Update Choice</button>'+
                             '<button onclick="deleteAnswer('+qid+','+div_id+')" class="btn btn-danger">Delete Choice</button>'
                            );
    }
  });  
}

function updateAnswer(qid,div_id){

  alert("update answer method is called")
  var div = document.getElementById("answer_"+qid+"_"+div_id);
 // alert($('#answer_'+qid+'_'+div_id).html() )
  question = $(div).find('#id_question').val()  
  id = $(div).find('#answer_id').val()
  alert(id)
  answer_text = $(div).find('#id_answer_text').val() 
  marks = $(div).find('#id_marks').val()
  //console.log('answer_text: '+answer_text+'marks :'+marks)
 var data = JSON.stringify({'question' : '/api/v1/question/'+question+'/',
              'answer_text' : answer_text,              
              'marks' : marks
  })
  $.ajax({
    url: '/api/v1/answer/'+id,
    type: 'PUT',
    contentType: 'application/json',
    data: data,
    dataType: 'json',
    processData: false,
    error: function(data){ 
     alert("error")   
    },
    success: function(data){
     alert("success")
    }
  });
  
}


function deleteAnswer(qid,div_id){
  alert("delete answer method is called")  
  var div = document.getElementById("answer_"+qid+"_"+div_id);  
  id = $(div).find("#answer_id").val()
  
  $.ajax({
    url: '/api/v1/answer/'+id +'/',
    type: 'DELETE',
    contentType: 'application/json',
    dataType: 'json',
    processData: false,
    error: function(data){   
      alert(data.error)
      $(div).remove(); 
    },
    success: function(data){      
      $(div).remove();
    }
  });
}


/*
function counter(){

  alert("working")
}*/






