// Purposely keeping this verbose, and expanded, until I figure out best patterns for question and extensability

$question_count = 0;

// The Master 
$MasterQuestion = "";

function QuestionShowMe($row)
	{
	$thisrow = $row.id;			
	$thisslug = $thisrow.replace("-icon","");

	$thisrow = document.getElementById($thisslug).style.display;

	if($thisrow=='none')
		{
		document.getElementById($thisslug).style.display = '';	
		}
	else
		{
		document.getElementById($thisslug).style.display = 'none';	
		}			
	}	
	
function QuestionViewEdit()
	{
	if(document.getElementById("jsonQuestionViewer").style.display=='')
		{
		document.getElementById("jsonQuestionViewer").style.display='none';
		document.getElementById("jsonQuestionEditor").style.display='';
		document.getElementById("questionsViewer").style.display='none';
		}	
	else
		{
		document.getElementById("jsonQuestionViewer").style.display='';
		document.getElementById("jsonQuestionEditor").style.display='none';	
		document.getElementById("questionsViewer").style.display='none';	
		}
	}
	
function QuestionQuestions()
	{
	if(document.getElementById("questionsViewer").style.display=='')
		{
		document.getElementById("questionsViewer").style.display='none';
		document.getElementById("jsonQuestionViewer").style.display='none';
		document.getElementById("jsonQuestionEditor").style.display='';
		}	
	else
		{
		document.getElementById("questionsViewer").style.display='';
		document.getElementById("jsonQuestionViewer").style.display='none';
		document.getElementById("jsonQuestionEditor").style.display='none';			
		}
	}
	
	
function addThisQuestion($question)
	{

	$ThisGroup = $question.id;
	console.log($ThisGroup);
	$question_group_count = $question.name;

	$question_question = document.getElementById('add-question-question').value;
	$question_answer = document.getElementById('add-question-answer').value;

	console.log($question_question + ' - ' + $question_answer);

	$questionArray = [];	  
	$questionArray[$question_question] = $question_answer;

 	$.extend($MasterQuestion[$ThisGroup], $questionArray);

	rebuildQuestionEditor($MasterQuestion);
	
	document.getElementById("alertarea").innerHTML = 'question has been added';	
	
	}		
	
function getAddQuestion()
	{	

	html = '<tr id="add-question" style="display: none;"><td align="center" colspan="2" style="font-size: 12px; background-color:#CCC;">';

	html = html + '<strong>Add Question</strong>';
    html = html + '<table border="0" width="90%">';
    
    html = html + '<tr>';
    html = html + '<td align="right" style="background-color:#FFF;"><strong>Question:</strong></td>';
    html = html + '<td align="left" style="background-color:#FFF;"><input type="text" id="add-question-question" value="" style="width: 100%; height: 100%; border: 0px solid #FFF;" /></td>';
    html = html + '</tr>';      
    
    html = html + '<tr>';
    html = html + '<td align="right" style="background-color:#FFF;"><strong>Answer:</strong></td>';
    html = html + '<td align="left" style="background-color:#FFF;"><input type="text" id="add-question-answer" value="" style="width: 100%; height: 100%; border: 0px solid #FFF;" /></td>';
    html = html + '</tr>';
    
    html = html + '<tr>';
    html = html + '<td align="center" style="background-color:#FFF;" colspan="2"><input type="button" name="add-question" id="add-question" value="Add This Property" onclick="addThisQuestion(this);" /></td>';
    html = html + '</tr>'     
    
    html = html + '</table>';
    
    html = html + '<br /></td></tr>'; 
    	
	return html; 			
	}		
	
function getQuestion($question_question,$question_answer,$question_count)
	{	

	html = '<tr id="edit-header"><td align="center" colspan="2" style="font-size: 12px;">';

    html = html + '<table border="1" width="95%">';
    
    html = html + '<tr>';
    html = html + '<td align="right" style="" width="30%"><strong>' + $question_question + ':</strong></td>';
    html = html + '<td align="left" style="">'
    
    html = html + $question_answer;
     
    html = html + '<a href="#" onclick="deleteQuestion(this);" id="delete-question-' + $question_count + '-icon" title="Delete Property"><img src="https://s3.amazonaws.com/kinlane-productions/bw-icons/bw-delete-circle.png" width="20" align="right"  /></a>';                     
     
    html = html + '<a href="#" onclick="QuestionShowMe(this); return false;" id="edit-question-' + $question_count + '-icon" title="Edit Property"><img src="https://s3.amazonaws.com/kinlane-productions/bw-icons/bw-edit-circle.png" width="20" align="right"  /></a>';
      
    html = html + '</td>';
    html = html + '</tr>';

    html = html + '</table>';
    
    html = html + '</td></tr>'; 	
	
	return html; 			
	}	
	
function deleteQuestion($button)
	{
		
	$id = $button.id;
	var $idArray = $id.split('-');	
	
	$questionGroupKey = $idArray[1];

	$question_group_count = $idArray[2];
	$question_count = $idArray[3];

	$FullArray = $MasterQuestion[$questionGroupKey]; 
	$FullArrayCount =  Object.keys($FullArray).length;
	
	$checkArray = Array.isArray($MasterQuestion[$questionGroupKey]);

	$MasterQuestion[$questionGroupKey] = {};
	$thisCount = 0;
 	$.each($FullArray, function(paramKey, paramValue) {
 		
 		$thisKey = paramKey;
 		$thisValue = paramValue;
 		
 		if($thisCount != $question_count)
 			{

			$questionObject = [];	  
			$questionObject[$thisKey] = $thisValue;

		 	$.extend($MasterQuestion[$questionGroupKey], $questionObject);
	
			}
		
		$thisCount++;
		
		if($thisCount == $FullArrayCount)
			{
				
			$viewer = JSON.stringify($MasterQuestion, null, 4);
	
			document.getElementById('jsonQuestionViewerDetails').innerHTML = $viewer; 	
 	
 			rebuildQuestionEditor($MasterQuestion);
 			
 			document.getElementById("alertarea").innerHTML = 'question has been deleted';	
 			 			
			}
		
 		});
 	
	}	
	
function saveQuestion($button)
	{
		
	$id = $button.id;
	var $idArray = $id.split('-');	
	
	$questionGroupKey = $idArray[1];
	$question_group_count = $idArray[2];
	$question_count = $idArray[3];
	$question_key = $idArray[4];
	
	$question_value = document.getElementById('question-' + $question_count + '-value').value;

 	$MasterQuestion[$questionGroupKey][$question_key] = $question_value;
 		
 	rebuildQuestionEditor($MasterQuestion);
 	
 	document.getElementById("alertarea").innerHTML = 'question has been saved';	
 	
	}	
	
function getEditQuestion($question_question,$question_answer,$question_count)
	{		

	html = '<tr id="edit-question-' + $question_count + '" style="display: none;"><td align="center" colspan="2" style="font-size: 12px; background-color:#CCC;">';

	html = html + '<strong>Edit Question</strong>';
    html = html + '<table border="0" width="90%">';  
    
    html = html + '<tr>';
    html = html + '<td align="right" style="background-color:#FFF;"><strong>Question:</strong></td>';
    html = html + '<td align="left" style="background-color:#FFF;"><input type="text" id="question-question-' + $question_count + '-question" value="' + $question_question + '" style="width: 100%; height: 100%; border: 0px solid #FFF;" /></td>';
    html = html + '</tr>';
    
    html = html + '<tr>';
    html = html + '<td align="right" style="background-color:#FFF;"><strong>Answer:</strong></td>';
    html = html + '<td align="left" style="background-color:#FFF;"><input type="text" id="question-question-' + $question_count + '-answer" value="' + $question_answer + '" style="width: 100%; height: 100%; border: 0px solid #FFF;" /></td>';
    html = html + '</tr>';    
    
    html = html + '<tr>';
    html = html + '<td align="center" style="background-color:#FFF;" colspan="2"><input type="button" id="question-question-' + $question_count + '-value-button" name="QuestionSave-' + $question_count + '-button" value="Save Changes" onclick="saveQuestion(this);" /></td>';
    html = html + '</tr>'    
    
    html = html + '</table>';
    
    html = html + '<br /></td></tr>'; 
    	
	return html; 			
	}	
	
function loadQuestionEditor()
    {

	console.log("loaded question editor...")

    $.getJSON("api-questions.json", function( data ) {
		
		//console.log(data);
		
    	$APIQuestion = data;
    	//$APIQuestion = JSON.parse(data);
    	
    	$MasterQuestion = $APIQuestion;

		buildQuestionEditor($MasterQuestion);		
									
		});		  
         	  	
    } 	
    
function rebuildQuestionEditor($QuestionArray)
    {
    	
	$apicount = 0;  
	$propertycount = 0;    	

	document.getElementById("jsonQuestionEditor").innerHTML = '';
	
	document.getElementById("jsonQuestionEditor").innerHTML = '<table cellpadding="3" cellspacing="2" border="0" width="95%" id="jsonQuestionEditorTable" style="margin-left: 15px;"></table>';

	// Pull From our Master Store
 	buildQuestionEditor($QuestionArray);
		
	}
	
function buildQuestionEditor($APIQuestion)
	{
		
	console.log("building question editor...")
	
	//console.log($APIQuestion);
			    	
	$MasterQuestion = $APIQuestion;
	
	$viewer = JSON.stringify($APIQuestion, null, 4);
	
	document.getElementById('jsonQuestionViewerDetails').innerHTML = $viewer;

	$HTML = getAddQuestion();
	$('#jsonQuestionEditorTable').append($HTML);    	

	$.each($APIQuestion, function($key, $value) { 																										

		$question_question = $value['question'];
		$question_answer = $value['answer'];

		$HTML = getQuestion($question_question,$question_answer,$question_count)
		$('#jsonQuestionEditorTable').append($HTML);    	

		$HTML = getEditQuestion($question_question,$question_answer,$question_count)
		$('#jsonQuestionEditorTable').append($HTML); 

		$question_count++;	
			
		});																		    		
	
	}
