function addAnswer(){
  question = $("#id_question").val();
  answers = $("#id_answers").val();
  marks = $("#id_marks").val();
  

    var data = JSON.stringify({'question' : '/api/v1/question/'+question+'/',
              'answers' : answers,              
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
     alert(data)
    },
    success: function(data){
      alert("success")
      window.location = "/quiz/answer/"
    }
})  
  
}

function deleteAnswer(id){
  
  var data = JSON.stringify({'id' : id })
  $.ajax({
    url: '/api/v1/answer/'+id +'/',
    type: 'DELETE',
    contentType: 'application/json',
    dataType: 'json',
    processData: false,
    error: function(data){    
    },
    success: function(data){
      window.location = "/quiz/answer/"
    }
  })
}

function getAnswer(){
  id = $("#id_id").val();
  $.ajax({
    url: '/api/v1/answer/'+id +'/',
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

function updateAnswer(id){
  
  question = $("#id_question").val();
  answers = $("#id_answers").val();
  marks = $("#id_marks").val();
  

    var data = JSON.stringify({'question' : '/api/v1/question/'+question+'/',
              'answers' : answers,              
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
    },
    success: function(data){
      //alert(data);
      window.location = "/quiz/answer/"
    }
  });
    
}

function editAnswer(id){
  $.ajax({
          url:'/quiz/showanswer/'+id+'/',
          success:function(data){

              $("#editAnswerForm").html(data)

          }

  });
}

function addAnswerForm(){
$.ajax({
        url:'/quiz/newanswer/',
        success:function(data){
              //alert(data);
              $("#addAnswerForm").html(data)

        }

})

}

function cancel(){
  window.location = "/quiz/answer/"
}