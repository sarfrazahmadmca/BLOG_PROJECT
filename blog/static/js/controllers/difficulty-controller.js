function addDifficulty(){
  code = $("#c_id_code").val();
  name = $("#c_id_name").val();
    var data = JSON.stringify({'code':code,
              'name':name
  })

$.ajax({
  url: '/api/v1/difficultylevel/',
  type: 'POST',
  contentType: 'application/json',
  data: data,
  dataType: 'json',
  processData: false,
    error: function(data){
    console.log(data.error)
      alert(data.error)
    },
    success: function(data){
     
      $('#message').text("success");
     
      $('#addDifficultyLevelModal').modal('hide');
      $('#addDifficultyLevelModal').trigger("reset");
      
      $('#difficultyLevelList tbody').append('<tr id=difficulty_level_'+data.id+'><td class=code>'+data.code+'</td><td class=name>'+data.name+'</td><td><button onclick=editDifficulty('+data.id+') class="btn btn-inverse" >Edit</button> <button onclick=deleteDifficulty('+data.id+') class="btn btn-danger" >Delete</button></td></tr>');
    

    }
})  
  
}

function deleteDifficulty(id){
  
  var data = JSON.stringify({'id' : id })
  $.ajax({
    url: '/api/v1/difficultylevel/'+id +'/',
    type: 'DELETE',
    contentType: 'application/json',
    dataType: 'json',
    processData: false,
    error: function(data){    
      alert(data.error)
    },
    success: function(data){
         $("#difficulty_level_"+id).remove();
    }
  })
}

/*function getDifficulty(){
  id = $("#id_id").val();
  $.ajax({
    url: '/api/v1/difficultylevel/'+id +'/',
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
      
      //$("#div1").html(data);
    }    
  })

}*/

function updateDifficulty(){
  
  id = $("#e_id").val();
  code = $("#e_code").val();
  name = $("#e_name").val();
  
  var data = JSON.stringify({'code':code,
              'name':name 
 })

  $.ajax({
          url: '/api/v1/difficultylevel/'+id,
          type : 'PUT',
          contentType: 'application/json',
          data: data,
          dataType: 'json',
          processData: false,    
          error:function(data){
            alert(data.error)
          },
          success:function(data){
            $('#editDifficultyLevelModal').modal('hide');
            $('#difficulty_level_'+data.id).html('<td class=code>'+data.code+'</td><td class=name>'+data.name+'</td><td><button onclick=editDifficulty('+data.id+') class="btn btn-inverse" >Edit</button> <button onclick=deleteDifficulty('+data.id+') class="btn btn-danger" >Delete</button></td>');
          }
  });  
}

function editDifficulty(id){
  
  $.ajax({
          url:'/api/v1/difficultylevel/'+id+'/?format=json',
          type:'GET',
          dataType:'JSON',
          success:function(data){            
            $("#e_code").val(data.code)
            $("#e_name").val(data.name)
            $("#e_id").val(data.id)
            //$("#editDifficultyLevel").html(data)
            editDifficultyLevelModal = true;
            $("#editDifficultyLevelModal").modal({show:true})
          },
          error:function(data){
            alert(data.error);
          }
  });
 
}

function addDifficultyForm(){
$.ajax({
        url:'/quiz/difficulty/',
        success:function(data){
              //alert(data);
              $("#addForm").html(data)
              //$('#modal').modal(options)

        }

});

}

