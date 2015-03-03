// Purposely keeping this verbose, and expanded, until I figure out best patterns for question and extensability

$question_group_count = 0;
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
	
function saveQuestionFile()
	{

	$QuestionJSON = JSON.stringify($MasterQuestion, null, 4);		

	// Save The File
    var github = new Github({
        token: $oAuth_Token,
        auth: "oauth"
            });
        
	var repo = github.getRepo('Stack-Network','blog');  	

	repo.getTree('master', function(err, tree) {
		
		// This is a workaround hack to get sha, as the github.js getSha doesn't seem to be working and I couldn't fix.
		// I'm looping through the tree to get sha, and then manually passing it to updates, and deletes
		
		$.each(tree, function(treeKey, treeValue) {
			
			$path = treeValue['path'];
			$sha = treeValue['sha'];
			
			if($path=='api-question.json')
				{							
			    repo.writemanual('master', 'api-question.json', $QuestionJSON, 'Saving question.json', $sha, function(err) { 
			    	
			    	document.getElementById("alertarea").innerHTML = 'api-question.json file has been saved';
			    	
			    	});									
				}
			});
		}); 	

	}		
	
function addQuestionGroup()
	{
		
	$question_group_key = document.getElementById('add-question-group-name').value;

	$questionGroupArray = [];	  
	$questionGroupArray[$question_group_key] = {};	  

 	$.extend($MasterQuestion, $questionGroupArray);

	rebuildQuestionEditor($MasterQuestion);
	
	document.getElementById("alertarea").innerHTML = 'question group has been added';			
		
	}	
	
function getAddQuestionGroup()
	{	

	html = '<tr id="add-question-group" style="display: none;"><td align="center" colspan="2" style="font-size: 12px; background-color:#CCC;">';

	html = html + '<strong>Add Question Group</strong>';
    html = html + '<table border="0" width="90%">';
    
    html = html + '<tr>';
    html = html + '<td align="right" style="background-color:#FFF;"><strong>group:</strong></td>';
    html = html + '<td align="left" style="background-color:#FFF;"><input type="text" id="add-question-group-name" value="" style="width: 100%; height: 100%; border: 0px solid #FFF;" /></td>';
    html = html + '</tr>';      

    html = html + '<tr>';
    html = html + '<td align="center" style="background-color:#FFF;" colspan="2"><input type="button" name="add-question-group-button" id="add-question-group-button" value="Add" onclick="addQuestionGroup();" /></td>';
    html = html + '</tr>'     
    
    html = html + '</table>';
    
    html = html + '<br /></td></tr>'; 
    	
	return html; 			
	}	
	
function deleteQuestionGroup($button)
	{
		
	$id = $button.id;
	var $idArray = $id.split('-');	
	
	$question_group_count = $idArray[2];

	$FullArray = $MasterQuestion; 
	$FullArrayCount =  Object.keys($FullArray).length;

	$MasterQuestion = {};
	$thisCount = 0;
 	$.each($FullArray, function(paramKey, paramValue) {
 		
 		$thisKey = paramKey;
 		$thisValue = paramValue;
 		
 		if($thisCount != $question_group_count)
 			{

			$questionGroupObject = [];	  
			$questionGroupObject[$thisKey] = $thisValue;

		 	$.extend($MasterQuestion, $questionGroupObject);
	
			}
		
		$thisCount++;
		
		if($thisCount == $FullArrayCount)
			{
				
			$viewer = JSON.stringify($MasterQuestion, null, 4);
	
			document.getElementById('jsonQuestionViewerDetails').innerHTML = $viewer; 	
 	
 			rebuildQuestionEditor($MasterQuestion);
 			 			
			}
		
 		});
 		
 	document.getElementById("alertarea").innerHTML = 'question group has been deleted';		
 	
	}		
	
// Localize Templating, making as editable as possible	
function getQuestionGroup($question_group_name,$question_group_count)
	{		
	html = '<tr>';
	html = html + '<td colspan="2" style="padding-top: 5px; padding-bottom: 5px;">';
	html = html + '<span style="font-size:20px;">';
	html = html + '<strong>' + $question_group_name + '</strong>';
	
	html = html + '<a href="#" onclick="deleteQuestionGroup(this); return false;" id="delete-question-' + $question_group_count + '-icon" title="Delete Question Group"><img src="https://s3.amazonaws.com/kinlane-productions/bw-icons/bw-delete-circle.png" width="35" align="right"  /></a>';
			
	html = html + '<a href="#" onclick="QuestionShowMe(this); return false;" id="add-question-' + $question_group_count + '-icon" title="Add Question"><img src="https://s3.amazonaws.com/kinlane-productions/bw-icons/bw-add-circle.png" width="35" align="right"  /></a>';
	
	html = html + '</span>';
	html = html + '</td>';
	html = html + '</tr>';
	return html;   				
	}	
	
function addThisQuestion($question)
	{

	$ThisGroup = $question.id;
	console.log($ThisGroup);
	$question_group_count = $question.name;

	$question_key = document.getElementById('add-question-' + $question_group_count + '-key').value;
	$question_value = document.getElementById('add-question-' + $question_group_count + '-value').value;

	console.log($question_key + ' - ' + $question_value);

	$questionArray = [];	  
	$questionArray[$question_key] = $question_value;

 	$.extend($MasterQuestion[$ThisGroup], $questionArray);

	rebuildQuestionEditor($MasterQuestion);
	
	document.getElementById("alertarea").innerHTML = 'question has been added';	
	
	}		
	
function getAddQuestion($questionGroupKey,$question_group_count)
	{	

	html = '<tr id="add-question-' + $question_group_count + '" style="display: none;"><td align="center" colspan="2" style="font-size: 12px; background-color:#CCC;">';

	html = html + '<strong>Add Question in ' + $questionGroupKey + '</strong>';
    html = html + '<table border="0" width="90%">';
    
    html = html + '<tr>';
    html = html + '<td align="right" style="background-color:#FFF;"><strong>key:</strong></td>';
    html = html + '<td align="left" style="background-color:#FFF;"><input type="text" id="add-question-' + $question_group_count + '-key" value="" style="width: 100%; height: 100%; border: 0px solid #FFF;" /></td>';
    html = html + '</tr>';      
    
    html = html + '<tr>';
    html = html + '<td align="right" style="background-color:#FFF;"><strong>value:</strong></td>';
    html = html + '<td align="left" style="background-color:#FFF;"><input type="text" id="add-question-' + $question_group_count + '-value" value="" style="width: 100%; height: 100%; border: 0px solid #FFF;" /></td>';
    html = html + '</tr>';
    
    html = html + '<tr>';
    html = html + '<td align="center" style="background-color:#FFF;" colspan="2"><input type="button" name="' + $question_group_count + '" id="' + $questionGroupKey + '" value="Add This Property" onclick="addThisQuestion(this);" /></td>';
    html = html + '</tr>'     
    
    html = html + '</table>';
    
    html = html + '<br /></td></tr>'; 
    	
	return html; 			
	}		
	
function getQuestion($questionGroupKey,$question_key,$question_value,$question_group_count,$question_count)
	{	

	html = '<tr id="edit-header"><td align="center" colspan="2" style="font-size: 12px;">';

    html = html + '<table border="0" width="95%">';
    
    html = html + '<tr>';
    html = html + '<td align="right" style="" width="15%"><strong>' + $question_key + ':</strong></td>';
    html = html + '<td align="left" style="">'
    
    html = html + $question_value;
     
    html = html + '<a href="#" onclick="deleteQuestion(this);" id="delete-' + $questionGroupKey + '-' + $question_group_count + '-' + $question_count + '-icon" title="Delete Property"><img src="https://s3.amazonaws.com/kinlane-productions/bw-icons/bw-delete-circle.png" width="20" align="right"  /></a>';                     
     
    html = html + '<a href="#" onclick="QuestionShowMe(this); return false;" id="edit-' + $questionGroupKey + '-' + $question_group_count + '-' + $question_count + '-icon" title="Edit Property"><img src="https://s3.amazonaws.com/kinlane-productions/bw-icons/bw-edit-circle.png" width="20" align="right"  /></a>';
      
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
	
	$question_value = document.getElementById('question-' + $questionGroupKey + '-' + $question_count + '-value').value;

 	$MasterQuestion[$questionGroupKey][$question_key] = $question_value;
 		
 	rebuildQuestionEditor($MasterQuestion);
 	
 	document.getElementById("alertarea").innerHTML = 'question has been saved';	
 	
	}	
	
function getEditQuestion($questionGroupKey,$question_key,$question_value,$question_group_count,$question_count)
	{		

	html = '<tr id="edit-' + $questionGroupKey + '-' + $question_group_count + '-' + $question_count + '" style="display: none;"><td align="center" colspan="2" style="font-size: 12px; background-color:#CCC;">';

	html = html + '<strong>Edit Question</strong>';
    html = html + '<table border="0" width="90%">';  
    
    html = html + '<tr>';
    html = html + '<td align="right" style="background-color:#FFF;"><strong>' + $question_key + ':</strong></td>';
    html = html + '<td align="left" style="background-color:#FFF;"><input type="text" id="question-' + $questionGroupKey + '-' + $question_count + '-value" value="' + $question_value + '" style="width: 100%; height: 100%; border: 0px solid #FFF;" /></td>';
    html = html + '</tr>';
    
    html = html + '<tr>';
    html = html + '<td align="center" style="background-color:#FFF;" colspan="2"><input type="button" id="question-' + $questionGroupKey + '-' + $question_group_count + '-' + $question_count + '-' + $question_key + '-value-button" name="QuestionSave-' + $question_group_count + '-' + $question_count + '-button" value="Save Changes" onclick="saveQuestion(this);" /></td>';
    html = html + '</tr>'    
    
    html = html + '</table>';
    
    html = html + '<br /></td></tr>'; 
    	
	return html; 			
	}	
	
function loadQuestionEditor()
    {

	console.log("loaded question editor...")

    $.getJSON("api-questions.json", function( data ) {
		
		console.log(data);
									
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
			    	
	$MasterQuestion = $APIQuestion;
	
	$viewer = JSON.stringify($APIQuestion, null, 4);
	
	document.getElementById('jsonQuestionViewerDetails').innerHTML = $viewer;

	$HTML = getAddQuestionGroup();
	$('#jsonQuestionEditorTable').append($HTML);    	

	$.each($APIQuestion, function(questionGroupKey, $values) { 

		$HTML = getQuestionGroup(questionGroupKey,$question_group_count);			
		$('#jsonQuestionEditorTable').append($HTML);    						
						
		$HTML = getAddQuestion(questionGroupKey,$question_group_count)			
		$('#jsonQuestionEditorTable').append($HTML);    																										
						
		$.each($values, function(questionKey, questionValue) { 

			$HTML = getQuestion(questionGroupKey,questionKey,questionValue,$question_group_count,$question_count);		
			$('#jsonQuestionEditorTable').append($HTML);   	
			
			$HTML = getEditQuestion(questionGroupKey,questionKey,questionValue,$question_group_count,$question_count)		
			$('#jsonQuestionEditorTable').append($HTML);   							
			
			getEditQuestion(questionKey,questionValue,$question_group_count,$question_count)						
				
			$question_count++;	
				
			});						
			
			$question_group_count++;	
			$question_count = 0;
												
		});													    	
	
	
	}
