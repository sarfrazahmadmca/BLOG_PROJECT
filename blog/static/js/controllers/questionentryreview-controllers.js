
$(document).ready(function(){
	document.getElementById('topicDetails').style.display = "none";
	document.getElementById('questionsList').style.display = "none";
	document.getElementById('viewQuestion').style.display = "none";
	document.getElementById('editQuestion').style.display = "none";
	document.getElementById('newQuestion').style.display = "none";
  document.getElementById('Question').style.display = "none";
  //document.getElementById('message').style.display = "none";
  document.getElementById('preview').style.display = "none";

  
	

	$("a").click(function(){
		console.log(this.id)	
		id=this.id        
		$.ajax({
				url:'/api/v1/topic/'+id+'/',
				type:'GET',
				dataType:'json',
				success:function(data){
					//$("#topicDetails").append("<p>"+data.name+"</p>");
					/*document.getElementById('topicDetails').innerHTML ="<h3 align='center'><u>Topic Details</u></h3><br/>"+
					"<p>Topic Code :"+data.code+
					"</br>Topic Name :"+data.name+
					" <br/>Syllabus Code:"+data.syllabus.code+
					"<br/>Syllabus Name :"+data.syllabus.name+
					"</p>"+
					"<button onclick='addNewQuestion("+id+")'>Add Question</button><hr>";*/
          document.getElementById('topicDetails').innerHTML ="<h3 align='center'><u>Topic Details</u></h3><br/>"+         
          "Topic Code &nbsp;&nbsp;&nbsp;&nbsp;<input type='text' name='topic code' value = '"+data.code+"' readonly />"+
          "&nbsp;Topic Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type='text' name='topic name' value = '"+data.name+"' readonly /><br/>"+
          "Syllabus Code  <input type='text' name='syllabus code' value = '"+data.syllabus.code+"' readonly />"+
          "&nbsp;Syllabus Name  <input type='text' name='syllabus name' value = '"+data.syllabus.name+"' readonly /><br/>"+
          "Subject Code &nbsp; <input type='text' name='subject code' value = '"+data.syllabus.subject.code+"' readonly />"+
          "&nbsp;Subject Name&nbsp;&nbsp;<input type='text' name='subject name' value = '"+data.syllabus.subject.name+"' readonly /><br/>"+
          "Grade Code&nbsp;&nbsp;&nbsp;&nbsp;<input type='text' name='grade code' value = '"+data.syllabus.grade.code+"' readonly />"+
          "&nbsp;Grade Name&nbsp;&nbsp;&nbsp;&nbsp;<input type='text' name='grade name' value = '"+data.syllabus.grade.name+"' readonly /><br/>"+
          "<button onclick='addNewQuestion("+id+")'>Add Question</button><hr>";
					document.getElementById('topicDetails').style.display = "block";

					console.log(data)

					$.ajax({
							
							url:'/api/v1/question/?topic='+id,
							type:'GET',
							dataType:'json',
							success:function(data){
								cnt = data.meta.offset
								var next = "'"+data.meta.next+"'"
								var previous = "'"+data.meta.previous+"'"
								console.log("offset:"+cnt)
								document.getElementById('questionsList').style.display = "block";
								console.log(data.objects.length);
               // jQuery.getScript('http://mathdox.org/formulaeditor/main.js');
                $('#questionsList').empty()
                //<div style="border: 1px black solid; align: left;" readonly>'
								//$('#questionsList table').empty()
								//$('#questionsList table').append('<thead><th style="width: 3%">S.No</th><th>Q.NO</th><th style="width: 50%">Question Text</th><th style="width: 30%">Actions</th></thead><tbody></tbody>');
								for(i=0; i < data.objects.length ; i++){
                  $('#questionsList').append('<div id="question_'+data.objects[i].id+'"></div>');
								  $("#question_"+data.objects[i].id).append('Q.No :'+data.objects[i].id+'<br/>'+
                  'Question Text :<div id="question_text_'+data.objects[i].id+'" style="border: 1px black solid; align: left; width:93%" readonly>'+data.objects[i].question_text+'</div><br/>'+                  
                  'Difficulty Level :'+data.objects[i].difficulty_level.name+                 
                  '&nbsp;&nbsp;&nbsp;&nbsp;Question Type :'+data.objects[i].question_type);
                  $('#question_'+data.objects[i].id).append('<br/><ol Type="A"></ol>');
                  for(j=0; j < data.objects[i].answers.length ; j++){
                    $('#question_'+data.objects[i].id+' ol').append('<li><div style="overflow: auto;"><div style="border: 1px black solid; float: left;width:40%;" readonly>'+data.objects[i].answers[j].answer_text+
                    '</div><div align="left">Marks :<input type="text" style="width:4%;" readonly value="'+data.objects[i].answers[j].marks+'"></input></div></div></li>');
                  }
                  $("#question_"+data.objects[i].id).append('<div style="overflow: auto;"><div style="border: 1px black solid; float: left;width:40%;" readonly> Hint :'+data.objects[i].hint+'</div>'+
                    '<div style="float:left;width:2%;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div><div style="border: 1px black solid; float: left;width:50%;" readonly>Explanation :'+data.objects[i].explanation+'</div></div><br/>');
                  $("#question_"+data.objects[i].id).append('<button class="btn btn-primary" onclick="editQuestion('+data.objects[i].id+')">Edit Question</button><br/>');
								  /*$('#questionsList table tbody').append('<tr id='+data.objects[i].id+'><td style="line-height: 12px">'+(cnt+(i+1))+'</td><td>'+data.objects[i].id+'</td><td style="line-height: 12px">'+data.objects[i].question_text+
								    '</td><td style="line-height: 12px"><buttonstyle="line-height: 11px;font-size: 10px;" onclick="editQuestion('+data.objects[i].id+')">Edit Question</button>'+
								    '<button style="line-height: 11px;font-size: 10px;" onclick="deleteQuestion('+data.objects[i].id+')">Delete Question</button>'+								  	
								  	'</td></tr>');*/	    
                                
								}
                $('#questionsList').append('<button onclick="previous('+previous+')">Previous</button>'+
								    '<button onclick="next('+next+')">Next</button>'); 
                
                
                mjax(); 

                //MathJax.Hub.Queue(["Typeset",MathJax.Hub,"#question_text_"+data.objects[i].id]);         
								console.log(data.meta.next)
								console.log(data.meta.previous)
                $('#Question').empty()
                               
							},
							error:function(data){

								console.log(data)
							}


					})
				},
				error:function(data){

					console.log(data.responseText.error)
				}

		});





	})
 
});






function viewQuestion(id){
	$.ajax({
				url:'/quiz/getquestionform/'+id+'/',
				type:'GET',
				
				success:function(data){
					$("#Question").html(data).show();

				},
				error:function(){}


	})
}

function editQuestion(id){ 
  
  var i, t = tinyMCE.editors;
  //var c = i.length
  //alert(c)
  //if(c > 0){
   //tinyMCE.remove()
   for (i in t){
    if (t.hasOwnProperty(i)){
        t[i].remove();
    }
   } 
  //}

  /*MathJax.Hub.Config({
    extensions: ["tex2jax.js"],
    jax: ["input/TeX","output/HTML-CSS"],
    tex2jax: {inlineMath: [["$","$"],["\\(","\\)"]]}
  });*/   

  console.log("editQuestion method is called for question :"+id)  
  document.getElementById('Question').style.display = "block";
	$.ajax({
				url:'/quiz/getquestionform/'+id+'/',
				type:'GET',
                
				
				success:function(data){
          $("#Question").empty()
          $("#Question").show()          
          $("#Question").append(data)          
          $("#Question").append('<input id="id_question" value='+id+' type="hidden" />');
          
          /*MathJax.Hub.Config({
            tex2jax: {
            inlineMath: [["$","$"],["\\(","\\)"]]
            }
          }); 
          MathJax.Hub.Config();*/
          //var math = MathJax.Hub.getAllJax("139_id_question_text");
          //var math = document.getElementById("139_id_question_text");
          //MathJax.Hub.Queue(["Typeset",MathJax.Hub,math]);
          //console.log(MathJax.Hub.Queue(["Typeset",MathJax.Hub,math]))
          //MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
          //MathJax.Hub.Queue(["Typeset",MathJax.Hub, "139_id_question_text"]);
          /*$('#139_id_question_text').load(' ' + '#139_id_question_text', function(){
           MathJax.Hub.Queue(["Typeset",MathJax.Hub, "139_id_question_text"]);
          });*/ 
          //var math = document.getElementById("139_id_question_text");
          //console.log("math:"+math.value)
          //MathJax.Hub.Queue(["Typeset",MathJax.Hub,"math"]);
         /*tinyMCE.init({ plugins : 'equation,emotions,preview,media,insertdatetime,paste',
          mode : "textarea",
          theme : "advanced",
          theme_advanced_buttons1 : "equation,bold,italic,underline,separator,strikethrough,justifyleft",
          theme_advanced_buttons2 : "emotions,preview,media,image,insertdatetime",
          theme_advanced_buttons3 : "paste",
          theme_advanced_toolbar_location : "top",
          theme_advanced_toolbar_align : "left",
          theme_advanced_statusbar_location : "bottom",
          theme_advanced_resizing : true,
          template_external_list_url : "lists/template_list.js",
          external_link_list_url : "lists/link_list.js",
          external_image_list_url : "lists/image_list.js",
          media_external_list_url : "lists/media_list.js",
          autosave_interval: "5s",
          width : "150",
          height : "100",
          });// TinyMce with math type*/
          


          //MathJax.Hub.Queue(["Typeset",MathJax.Hub, id+'_id_question_text']); 
          //var math = document.getElementById("139_id_question_text");
          //console.log("math:"+math.value)
          //MathJax.Hub.Queue(["Typeset",MathJax.Hub,"math"]);
          /*tinymce.init({
           plugins: "paste"
           paste_auto_cleanup_on_paste : true,
           paste_remove_styles: true,
           paste_remove_styles_if_webkit: true,
           paste_strip_class_attributes: true,
          });*/
          

          
            tinyMCE.execCommand('mceAddControl', false, id+'_id_question_text');
            tinyMCE.execCommand('mceAddControl', false, id+'_id_explanation');
            tinyMCE.execCommand('mceAddControl', false, id+'_id_hint');
          

          /*tinyMCE.execCommand('mceAddControl', false, id+'_id_question_text');
          tinyMCE.execCommand('mceAddControl', false, id+'_id_explanation');
          tinyMCE.execCommand('mceAddControl', false, id+'_id_hint');*/

          var answers_count = $('#Question ol').children().length
          for(i=0; i<answers_count;i++){
            //console.log('id_answer_text_'+id+'_'+i+'')

            
            tinyMCE.execCommand('mceAddControl', false, 'id_answer_text_'+id+'_'+i+''); 
            

          }


         /*$("#Question .explanation").after('<div class="actions"><input type="hidden" id="id_id" name="question" value="'+id+'" />'+
                                '<button onclick="addAnswer('+id+')" class="btn btn-inverse">Add Choice</button>'+
                                '<button onclick="updateQuestion('+id+')" class="btn btn-primary">Update Question</button>'+
                                '<button onclick="deleteQuestion('+id+')" class="btn btn-danger">Delete Question</button>'+
                                '<button onclick="done()" class="btn btn-inverse">Done</button></div>'+
                                '<button onclick="mjaxPreview()" class="btn btn-inverse">Preview</button></div>');*/
          $("html, body").animate({ scrollTop: $('#Question').offset().top }, 400);	
          mjax();			

				},
				error:function(){
          console.log("Error occured")
        }


	})
}

function addNewQuestion(id){
  var i, t = tinyMCE.editors;
  for (i in t){
    if (t.hasOwnProperty(i)){
        t[i].remove();
    }
  }
	alert("addNewQuestion method is called")
  
  $('#Question').empty()
	document.getElementById('Question').style.display = "block";

	 
	$.ajax({
				url:'/quiz/newquestionform',
				type:'GET',			
				success:function(data){
           
          $("#Question").empty()
          $("#Question").show()
          $("#Question").append('<input id="C_id_topic" value='+id+' type="hidden" />')
          $("#Question").append(data)  

          tinyMCE.execCommand('mceAddControl', false, 'C_id_question_text');
          tinyMCE.execCommand('mceAddControl', false, 'C_id_explanation');
          tinyMCE.execCommand('mceAddControl', false, 'C_id_hint');
          
          
          

          $("#Question .explanation").after('<div class="actions"><button onclick="saveQuestion()">Save</button>'+
            '<button onclick="mjaxPreview()">Preview</button>'+
            '<button onclick="cancel()">Cancel</button></div>');
          $("html, body").animate({ scrollTop: $('#Question').offset().top }, 400);
					
				},
				error:function(){}


	})
}

function saveQuestion(){
	//alert("saveQuestion method is called")
	tinyMCE.triggerSave();
  var div = document.getElementById("Question");  
  topic = $(div).find('#C_id_topic').val()
  question_text = $(div).find('#C_id_question_text').val()
  question_type = $(div).find('#id_question_type').val()
  difficulty_level = $(div).find('#id_difficulty_level').val()
  explanation = $(div).find('#C_id_explanation').val()
  hint = $(div).find('#C_id_hint').val()

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
      //alert("success");
      $("#message").remove();
      $("#Question").append('<div id="message" class="alert alert-success" style="text-align:center;">'+
          '</div>');
      $("#message").append('<span>Question created successfully</span>');
      $('#message').show()
      $("html, body").animate({ scrollTop: $('#message').offset().top }, 400);
      
      $("#Question button").hide();
      $("#Question").append('<input type="hidden" id="id_id" name="question" value="'+data.id+'" />'+
                                '<button onclick="addAnswer('+data.id+')" class="btn btn-inverse">Add Choice</button>'+
                                '<button onclick="updateQuestion('+data.id+')" class="btn btn-primary">Update Question</button>'+
                                '<button onclick="deleteQuestion('+data.id+')" class="btn btn-danger">Delete Question</button>'+
                                '<button onclick="done()" class="btn btn-inverse">Done</button>');  
      var no_of_questions = $('#questionsList table tbody tr').length
      console.log("no of questions :"+no_of_questions)
      if(no_of_questions==1){
        $('#questionsList table tbody tr:last').before('<tr id='+data.id+'><td>'+(no_of_questions)+'</td><td>'+data.id+'</td><td>'+data.question_text+
                    '</td><td></td><td><button onclick="editQuestion('+data.id+')">Edit Question</button>'+
                    '<button onclick="deleteQuestion('+data.id+')">Delete Question</button>'+                    
                    '</td></tr>');
      }
      else{
        $('#questionsList table tbody tr:last').before('<tr id='+data.id+'><td>'+(no_of_questions)+'</td><td>'+data.id+'</td><td>'+data.question_text+
                    '</td><td><button onclick="editQuestion('+data.id+')">Edit Question</button>'+
                    '<button onclick="deleteQuestion('+data.id+')">Delete Question</button>'+                    
                    '</td></tr>');
      }
      
      mjax();
      
    }
  });
}

function updateQuestion(id){
  console.log("updateQuestion method is called")
  tinyMCE.triggerSave();
  var div = document.getElementById("Question");  
  topic = $(div).find('#id_topic').val()
  question_text = $(div).find('#'+id+'_id_question_text').val()
  question_type = $(div).find('#id_question_type').val()
  difficulty_level = $(div).find('#id_difficulty_level').val()
  explanation = $(div).find('#'+id+'_id_explanation').val()
  hint = $(div).find('#'+id+'_id_hint').val()
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
      
      $("#message").remove();
      $("#Question").append('<div id="message" class="alert alert-success" style="text-align:center;">'+
          '</div>');
      $("#message").append('<span>Question updated successfully</span>');
      //$('#message').fadeIn('slow');      
      $('#message').show()
      //$("#message").dialog({ dialogClass: "alert", height : "auto" });
      
     // $('#Question').slideDown()
      //document.getElementById('message').style.display = "block";
      $("html, body").animate({ scrollTop: $('#message').offset().top }, 400);
      //location.hash = '#message'
      //$(window).animate({ scrollTop: $('#Question').offset().top }, 400);
      //$.scrollTo('#message')
      var xSeconds = 3000;
      setTimeout(function() {
      $('#message').fadeOut('fast');
      $('#message').hide();
      }, xSeconds);
      
      //alert("updated successfully");
      
    }
  });  

}

function addAnswer(id){
  //tinyMCE.remove()
   console.log("addAnswer method is called")  
  var marks = new Array()
    marks[0] = 0;
    marks[1] = 1;
    marks[2] = -0.25;
    marks[3] = -0.33;
  var marksList = "<select id='id_marks' name='marks' width: 200px; border: 1px solid #000; padding-top: 25px;'>";
  for(var j = 0; j< marks.length ; j++) {
    marksList += "<option value="+marks[j]+">"+marks[j]+"</option>";
   }
  marksList += "</select>"; 
  var div = document.getElementById("Question");
  var answers_count = $('#Question ol').children().length  
  var qid = id
  if(answers_count == 0){
  	//var div = document.getElementById("<ID_OF_THE_DIV>");
    /*div.innerHTML = div.innerHTML + "<ol type='A'><div id=answer_"+qid+"_"+answers_count+" class='control-group'>"+
                          "<div class='controls form-inline'>"+
                          "<li>"+
                          "<input id='id_question' value="+qid+" type='hidden' />"+
                          "<label for='id_answer_text'>Answer Text:</label>"+
                          "<textarea id='id_answer_text' rows='3'></textarea>"+
                          "<label for='id_marks'> Marks :</label>"+marksList+                          
                          "<button onclick='saveAnswer("+qid+","+answers_count+")' class='btn btn-primary'>Save Answer</button>"+                          
                          "</li>"+                        
                          "</div>"+
                          "</ol>";*/
            
    $('#Question').append('<ol type="A"><div id=answer_'+qid+'_'+answers_count+' class="answer" style="width: 700px;" >'+
                          '<li style="float:left">'+
                          '<input id="id_question" value='+qid+' type="hidden" />'+
                          '<label for="id_answer_text" style= "width: 400px; float: left; margin: 0 20px 0 0; padding-top: 25px;">Answer Text:'+
                          '<textarea id="id_answer_text_'+qid+'_'+answers_count+'" rows="2" style="width: 200px; border: 1px solid #000; padding: 5px;"></textarea></label>'+
                          '<label for="id_marks"  style= "width: 200px; float: left; margin: 0 20px 0 0; padding-top: 25px;"> Marks :'+marksList+
                          '<button onclick="saveAnswer('+qid+','+answers_count+')" class="btn btn-primary">Save Answer</button>'+                          
                          '</label>'+                          
                          '</li>'+                        
                          '</div>'+
                          '</ol>');

   
   tinyMCE.execCommand('mceAddControl', false, 'id_answer_text_'+qid+'_'+answers_count);
   


   $("html, body").animate({ scrollTop: $('#id_answer_text_'+qid+'_'+answers_count).offset().top }, 400);
  }
  else{
      	$('#Question ol' ).append('<div id=answer_'+qid+'_'+answers_count+' class="answer" style="width: 700px;" >'+
                          '<li style="float:left">'+
                          '<input id="id_question" value='+qid+' type="hidden" />'+
                          '<label for="id_answer_text" style= "float: left; margin: 0 20px 0 0;">Answer Text:'+
                          '<textarea id="id_answer_text_'+qid+'_'+answers_count+'" rows="2" style="width: 200px; border: 1px solid #000; padding: 5px;"></textarea></label>'+
                          '<label for="id_marks"  style= "width: 200px; float: left; margin: 0 20px 0 0; padding-top: 25px;"> Marks :'+marksList+
                          '<button onclick="saveAnswer('+qid+','+answers_count+')" class="btn btn-primary">Save Answer</button>'+                          
                          '</label>'+                          
                          '</li>'+                        
                          '</div>');

     	  tinyMCE.execCommand('mceAddControl', false, 'id_answer_text_'+qid+'_'+answers_count);
      

      $("html, body").animate({ scrollTop: $('#id_answer_text_'+qid+'_'+answers_count).offset().top }, 400);
    }   
}

function saveAnswer(qid,div_id){
  tinyMCE.triggerSave();
  var div = document.getElementById("answer_"+qid+"_"+div_id); 
  question = $(div).find('#id_question').val()  
  answer_text = $(div).find('#id_answer_text_'+qid+"_"+div_id).val() 
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
     $("#answer_"+qid+"_"+div_id+" li").append('<input type="hidden" id="answer_id" name="answer" value="'+data.id+'" />'+
                              '<button onclick="updateAnswer('+qid+','+div_id+')" class="btn btn-primary">Update Choice</button>'+
                              '<button onclick="deleteAnswer('+qid+','+div_id+')" class="btn btn-danger">Delete Choice</button>'
                            );
    }
  });  
} 

function updateAnswer(qid,div_id){
  console.log("update answer method is called")
  tinyMCE.triggerSave();
  var div = document.getElementById("answer_"+qid+"_"+div_id);
 // alert($('#answer_'+qid+'_'+div_id).html() )
  question = $(div).find('#id_question').val()  
  id = $(div).find('#answer_id').val()
  //alert(id)
  answer_text = $(div).find('#id_answer_text_'+qid+"_"+div_id).val() 
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
     console.log("error")   
    },
    success: function(data){
     console.log("success")
    }
  });
  
}


function deleteAnswer(qid,div_id){
  console.log("delete answer method is called")  
  var div = document.getElementById("answer_"+qid+"_"+div_id);  
  id = $(div).find("#answer_id").val()
  
  $.ajax({
    url: '/api/v1/answer/'+id +'/',
    type: 'DELETE',
    contentType: 'application/json',
    dataType: 'json',
    processData: false,
    error: function(data){   
      //alert(data.error)
      console.log(data.error)
      $(div).remove(); 
    },
    success: function(data){      
      $(div).remove();
    }
  });
}

/*function editQuestion(){
  document.getElementById('newQuestion').style.display = "none";
  document.getElementById('editQuestion').style.display = "block";
}*/

function cancel(){
	document.getElementById('Question').style.display = "none";
  tinyMCE.remove()
}

function next(api_url){
	if(api_url == "null"){}
	else{	
	$.ajax({
							
							url: api_url,
							type:'GET',
							dataType:'json',
							success:function(data){
								cnt = data.meta.offset
								var next = "'"+data.meta.next+"'"
								var previous = "'"+data.meta.previous+"'"
								console.log("offset:"+cnt)
								document.getElementById('questionsList').style.display = "block";
								console.log(data.objects.length);
								$('#questionsList').empty()
                //$('#questionsList table').empty()
                //$('#questionsList table').append('<thead><th style="width: 3%">S.No</th><th>Q.NO</th><th style="width: 50%">Question Text</th><th style="width: 30%">Actions</th></thead><tbody></tbody>');
                for(i=0; i < data.objects.length ; i++){
                  $('#questionsList').append('<div id="question_'+data.objects[i].id+'"></div>');
                  $("#question_"+data.objects[i].id).append('Q.No :'+data.objects[i].id+'<br/>'+
                  'Question Text :<div id="question_text_'+data.objects[i].id+'" style="border: 1px black solid; align: left; width:93%" readonly>'+data.objects[i].question_text+'</div><br/>'+                  
                  'Difficulty Level :'+data.objects[i].difficulty_level.name+                 
                  '&nbsp;&nbsp;&nbsp;&nbsp;Question Type :'+data.objects[i].question_type);
                  $('#question_'+data.objects[i].id).append('<br/><ol Type="A"></ol>');
                  for(j=0; j < data.objects[i].answers.length ; j++){
                    $('#question_'+data.objects[i].id+' ol').append('<li><div style="overflow: auto;"><div style="border: 1px black solid; float: left;width:40%;" readonly>'+data.objects[i].answers[j].answer_text+
                    '</div><div align="left">Marks :<input type="text" style="width:4%;" readonly value="'+data.objects[i].answers[j].marks+'"></input></div></div></li>');
                  }
                  $("#question_"+data.objects[i].id).append('<div style="overflow: auto;"><div style="border: 1px black solid; float: left;width:40%;" readonly> Hint :'+data.objects[i].hint+'</div>'+
                    '<div style="float:left;width:2%;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div><div style="border: 1px black solid; float: left;width:50%;" readonly>Explanation :'+data.objects[i].explanation+'</div></div><br/>');
                  $("#question_"+data.objects[i].id).append('<button class="btn btn-primary" onclick="editQuestion('+data.objects[i].id+')">Edit Question</button><br/>');
                  /*$('#questionsList table tbody').append('<tr id='+data.objects[i].id+'><td style="line-height: 12px">'+(cnt+(i+1))+'</td><td>'+data.objects[i].id+'</td><td style="line-height: 12px">'+data.objects[i].question_text+
                    '</td><td style="line-height: 12px"><buttonstyle="line-height: 11px;font-size: 10px;" onclick="editQuestion('+data.objects[i].id+')">Edit Question</button>'+
                    '<button style="line-height: 11px;font-size: 10px;" onclick="deleteQuestion('+data.objects[i].id+')">Delete Question</button>'+                   
                    '</td></tr>');*/      
                                
                }
                $('#questionsList').append('<button onclick="previous('+previous+')">Previous</button>'+
                    '<button onclick="next('+next+')">Next</button>')
                mjax();   
                //MathJax.Hub.Queue(["Typeset",MathJax.Hub,"#question_text_"+data.objects[i].id]);         
                console.log(data.meta.next)
                console.log(data.meta.previous)
                $('#Question').empty()                
								
                               
							},
							error:function(data){

								console.log(data)
							}


					})
   }
}

function previous(api_url){
	console.log(api_url)
	if(api_url == "null"){}
	else {	
	 $.ajax({
							
							url: api_url,
							type:'GET',
							dataType:'json',
							success:function(data){
								cnt = data.meta.offset
								var next = "'"+data.meta.next+"'"
								var previous = "'"+data.meta.previous+"'"
								console.log("offset:"+cnt)
								document.getElementById('questionsList').style.display = "block";
								console.log(data.objects.length);
								$('#questionsList').empty()
                //$('#questionsList table').empty()
                //$('#questionsList table').append('<thead><th style="width: 3%">S.No</th><th>Q.NO</th><th style="width: 50%">Question Text</th><th style="width: 30%">Actions</th></thead><tbody></tbody>');
                for(i=0; i < data.objects.length ; i++){
                  $('#questionsList').append('<div id="question_'+data.objects[i].id+'"></div>');
                  $("#question_"+data.objects[i].id).append('Q.No :'+data.objects[i].id+'<br/>'+
                  'Question Text :<div id="question_text_'+data.objects[i].id+'" style="border: 1px black solid; align: left; width:93%" readonly>'+data.objects[i].question_text+'</div><br/>'+                  
                  'Difficulty Level :'+data.objects[i].difficulty_level.name+                 
                  '&nbsp;&nbsp;&nbsp;&nbsp;Question Type :'+data.objects[i].question_type);
                  $('#question_'+data.objects[i].id).append('<br/><ol Type="A"></ol>');
                  for(j=0; j < data.objects[i].answers.length ; j++){
                    $('#question_'+data.objects[i].id+' ol').append('<li><div style="overflow: auto;"><div style="border: 1px black solid; float: left;width:40%;" readonly>'+data.objects[i].answers[j].answer_text+
                    '</div><div align="left">Marks :<input type="text" style="width:4%;" readonly value="'+data.objects[i].answers[j].marks+'"></input></div></div></li>');
                  }
                  $("#question_"+data.objects[i].id).append('<div style="overflow: auto;"><div style="border: 1px black solid; float: left;width:40%;" readonly> Hint :'+data.objects[i].hint+'</div>'+
                    '<div style="float:left;width:2%;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div><div style="border: 1px black solid; float: left;width:50%;" readonly>Explanation :'+data.objects[i].explanation+'</div></div><br/>');
                  $("#question_"+data.objects[i].id).append('<button class="btn btn-primary" onclick="editQuestion('+data.objects[i].id+')">Edit Question</button><br/>');
                  /*$('#questionsList table tbody').append('<tr id='+data.objects[i].id+'><td style="line-height: 12px">'+(cnt+(i+1))+'</td><td>'+data.objects[i].id+'</td><td style="line-height: 12px">'+data.objects[i].question_text+
                    '</td><td style="line-height: 12px"><buttonstyle="line-height: 11px;font-size: 10px;" onclick="editQuestion('+data.objects[i].id+')">Edit Question</button>'+
                    '<button style="line-height: 11px;font-size: 10px;" onclick="deleteQuestion('+data.objects[i].id+')">Delete Question</button>'+                   
                    '</td></tr>');*/      
                                
                }
                $('#questionsList').append('<button onclick="previous('+previous+')">Previous</button>'+
                    '<button onclick="next('+next+')">Next</button>')
                mjax();   
                //MathJax.Hub.Queue(["Typeset",MathJax.Hub,"#question_text_"+data.objects[i].id]);         
                console.log(data.meta.next)
								console.log(data.meta.previous)
                               
							},
							error:function(data){

								console.log(data)
							}


					})
   }
}

function deleteQuestion(id){
	//alert("deleteQuestion method is called"+id)
	//trid=$(this)
	//alert(id);

	console.log(id)


	$.ajax({
    url: '/api/v1/question/'+id +'/',
    type: 'DELETE',
    contentType: 'application/json',
    dataType: 'json',
    processData: false,
    error: function(data){    
      console.log(data)
      $('#'+id).remove();
    },
    success: function(data){
      //alert("question deleted successfully")      
      $("#message").remove();
      $("#Question").append('<div id="message" class="alert alert-success" style="text-align:center;">'+
          '</div>');
      $("#message").append('<span>Question deleted successfully</span>');
      $('#message').show()
      $("html, body").animate({ scrollTop: $('#message').offset().top }, 400);
      $('#'+id).remove();
    }
  })

}

function done(){
  
 /* var div = document.getElementById("newQuestion");
  $('#newQuestion id_question_text').reset() 
  $(div).find('#id_topic').reset()
  //$(div).find('#id_question_text').reset()
  $(div).find('#id_question_type').reset()
  $(div).find('#id_difficulty_level').reset()
  $(div).find('#id_explanation').reset()
  $(div).find('#id_hint').reset()*/
  //$('#C_id_question_text').tinymce().remove();
 //alert($('#tinymce').tinymce().getContent());
  tinymce.remove('#C_id_question_text');
  document.getElementById('Question').style.display = "none";
  
  tinyMCE.execCommand('mceRemoveControl', false, 'C_id_question_text');
  tinyMCE.execCommand('mceRemoveControl', false, 'C_id_explanation');
  tinyMCE.execCommand('mceRemoveControl', false, 'C_id_hint');
}

$('#message .close').click(function(e) {
    
    var xSeconds = 1000;
    setTimeout(function() {
      $('#message').fadeOut('fast');
      $('#message').hide();
    }, xSeconds);
    $("#message span").remove();
    //$("#message").hide();
});

/*$('#preview .close').click(function(e){
  $("#preview").empty();
});*/


/*function timerElapsed(){    
    tinymce.init({
    selector: "textarea"
 });
    
}

setInterval(function () {
    timerElapsed();
}, 5000);*/

function mjax() {
    //if (window.MathJax === undefined) {
        jQuery.getScript('http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=config=TeX-AMS-MML_HTMLorMML', function () {
            MathJax.Hub.Config({
                "HTML-CSS": {
                    preferredFont: "TeX",
                    availableFonts: ["STIX", "TeX"],
                    linebreaks: {
                        automatic: true
                    },
                    EqnChunk: (MathJax.Hub.Browser.isMobile ? 10 : 50)
                },
                tex2jax: {
                    inlineMath: [
                        ["$", "$"],
                        ["\\\\(", "\\\\)"]
                    ],
                    displayMath: [
                        ["$$", "$$"],
                        ["\\[", "\\]"]
                    ],
                    processEscapes: true,
                    ignoreClass: "tex2jax_ignore|dno"
                },
                TeX: {
                    noUndefined: {
                        attributes: {
                            mathcolor: "red",
                            mathbackground: "#FFEEEE",
                            mathsize: "90%"
                        }
                    }
                },
                messageStyle: "none"
            });

            MathJax.Hub.Startup.onload();

            theLoop = function () {
                MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
                window.setTimeout(theLoop, 1000);
            };
            theLoop();
        });
    //} else {
        MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
    //}

}

/*function editQuestion(id){ 
  
  var i, t = tinyMCE.editors;
  for (i in t){
    if (t.hasOwnProperty(i)){
        t[i].remove();
    }
  }
  alert("editQuestion method is called")
  
  $('#Question').empty()
  document.getElementById('Question').style.display = "block";

   
  $.ajax({
        url:'/quiz/getquestionform/'+id+'/',
        type:'GET',     
        success:function(data){
           
          $("#Question").empty()
          $("#Question").show()
          $("#Question").append(data)
          $("#Question").append('<input id="C_id_topic" value='+id+' type="hidden" />')
          tinyMCE.execCommand('mceAddControl', false, 'C_id_question_text');
          tinyMCE.execCommand('mceAddControl', false, 'C_id_explanation');
          tinyMCE.execCommand('mceAddControl', false, 'C_id_hint');
          

          $("#Question .explanation").after('<div class="actions"><button onclick="saveQuestion()">Save</button>'+
            '<button onclick="mjaxPreview()">Preview</button>'+
            '<button onclick="cancel()">Cancel</button></div>');
          $("html, body").animate({ scrollTop: $('#Question').offset().top }, 400);
          
        },
        error:function(){}
  })
}*/


function mjaxPreview(){
 $("#mtype").remove();
 tinyMCE.triggerSave();
 //$("#preview").show()
 var question = $("#Question :input")
 console.log(question)
 var questionText = question[1].value
 console.log(question[1].id)
 //$("#preview").append('<button type="button" class="close" data-dismiss="alert">×</button>')
 $("#Question").append('<div id="mtype" class="alert">'+questionText+'</div>');
 //console.log($().jquery); // This prints v1.4.2
 //console.log($j().jquery); // This prints v1.9.1
 //$("#preview").show()
 //$("#preview").alert('close');
 //$("#Preview").modal({show:true})
 mjax();
 //$("#preview").show()
 $("#mtype").dialog({ height: "auto",draggable: true });

 //$("html, body").animate({ scrollTop: $('#preview').offset().top }, 400);

 // console.log($("#Question :input"))
}
/*setInterval(function () {
    mjax();
}, 5000)*/
