function addGradingBehaviour(){
	name = $("#id_name").val();
	description = $("#id_description").val();
    var data = JSON.stringify({'name':name,
							'description':description
	})

$.ajax({
  url: '/api/v1/gradingbehaviour/',
  type: 'POST',
  contentType: 'application/json',
  data: data,
  dataType: 'json',
  processData: false,
  error: function(data){    
    },
    success: function(data){
     alert("success");
     window.location = "/quiz/gradingbehaviour/"
    }
})	
	
}

function deleteGradingBehaviour(id){
  
  var data = JSON.stringify({'id' : id })
  $.ajax({
    url: '/api/v1/gradingbehaviour/'+id +'/',
    type: 'DELETE',
    contentType: 'application/json',
    dataType: 'json',
    processData: false,
    error: function(data){    
    },
    success: function(data){
      alert("deleted successfully")
      window.location = "/quiz/gradingbehaviour/"
    }
  })
}

function getGradingBehaviour(){
  id = $("#id_id").val();
  $.ajax({
    url: '/api/v1/gradingbehaviour/'+id +'/',
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

function updateGradingBehaviour(id){
  //alert('working');
  //id = $("#id_id").val();
  //alert(id)
  name = $("#id_name").val();
  description = $("#id_description").val();
  //alert(code)
  //alert(name)
  var data = JSON.stringify({'name':name,
              'description':description 
   })
  $.ajax({
    url: '/api/v1/gradingbehaviour/'+id,
    type: 'PUT',
    contentType: 'application/json',
    data: data,
    dataType: 'json',
    processData: false,
    error: function(data){    
    },
    success: function(data){
      //alert(data);
      window.location = "/quiz/gradingbehaviour/"
    }
  });
    
}

function editGradingBehaviour(id){
  $.ajax({
          url:'/quiz/showgradingbehaviour/'+id+'/',
          success:function(data){

              $("#div").html(data)

          }

  });
}

function addGradingBehaviourForm(){
$.ajax({
        url:'/quiz/grading/',
        success:function(data){
              //alert(data);
              $("#addForm").html(data)

        }

})

}

function cancel(){
  window.location = "/quiz/gradingbehaviour/"
}