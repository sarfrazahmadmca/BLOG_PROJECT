function addQuizTopic(){
	
  quiz_setting = $("#id_quiz_setting").val();
  topic = $("#id_topic").val();
  number_of_questions = $("#id_number_of_questions").val();
  difficulty_level = $("#id_difficulty_level").val();
	

    var data = JSON.stringify({'quiz_setting' : '/api/v1/quizsetting/'+quiz_setting+'/',
							'topic' : '/api/v1/gradingbehaviour/'+topic+'/',
              'number_of_questions' : number_of_questions,
              'difficulty_level' : '/api/v1/difficultylevel/'+difficulty_level+'/'

	})

$.ajax({
  url: '/api/v1/quiztopic/',  
  type: 'POST',
  data:data,
  contentType: 'application/json',
  dataType: 'json',
  processData:false,
  error: function(data){    
    },
    success: function(data){
     alert("success");
     window.location = "/quiz/quiztopic/"
    }
})	
	
}

function deleteQuizTopic(id){
  
  var data = JSON.stringify({'id' : id })
  $.ajax({
    url: '/api/v1/quiztopic/'+id +'/',
    type: 'DELETE',
    contentType: 'application/json',
    dataType: 'json',
    processData: false,
    error: function(data){    
    },
    success: function(data){
      alert("deleted successfully")
      window.location = "/quiz/quiztopic/"
    }
  })
}

function getQuizTopic(){
  id = $("#id_id").val();
  $.ajax({
    url: '/api/v1/quiztopic/'+id +'/',
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
      //window.location = "/quiz/difficultyretrieve/"
      //$("#div1").html(data);
    }    
  })

}

function updateQuizTopic(id){
  
  quiz_setting = $("#id_quiz_setting").val();
  topic = $("#id_topic").val();
  number_of_questions = $("#id_number_of_questions").val();
  difficulty_level = $("#id_difficulty_level").val();
  

  var data = JSON.stringify({'quiz_setting' : '/api/v1/quizsetting/'+quiz_setting+'/',
              'topic' : '/api/v1/topic/'+topic+'/',
              'number_of_questions' : number_of_questions,
              'difficulty_level' : '/api/v1/difficulty_level/'+difficulty_level+'/'

  })
  $.ajax({
    url: '/api/v1/quiztopic/'+id,
    type: 'PUT',
    contentType: 'application/json',
    data: data,
    dataType: 'json',
    processData: false,
    error: function(data){    
    },
    success: function(data){
      //alert(data);
      window.location = "/quiz/quiztopic/"
    }
  });
    
}

function editQuizTopic(id){
  $.ajax({
           url:'/quiz/showquiztopic/'+id+'/',           
           error: function(data){
           },
           success:function(data){
              $("#div").html(data);
           }

  });
}

function addQuizTopicForm(){
$.ajax({
        url:'/quiz/newquiztopic/',
        error: function(data){
        },
        success:function(data){
              //alert(data);
              $("#addForm").html(data)

        }

})

}

