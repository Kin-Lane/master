// Purposely keeping this verbose, and expanded, until I figure out best patterns for config and extensability


function deployCodeMaster($codeLibraryURL,$itemcount,$apiName)
  	{		
	console.log("processing..." + $codeLibraryURL + " (" + $itemcount + ")");

	$html = '<tr>';
	$html = $html + '<td colspan="2" style="padding-top: 0px; padding-bottom: 0px;">';				
	$html = $html + '<span style="font-size:20px;">';
	$html = $html + '<strong>' + $apiName + '</strong>';
	$html = $html + '</span>';				
	$html = $html + '</td>';
	$html = $html + '</tr>';						
	$('#code-page').append($html); 	

	var jqxhr = $.getJSON($codeLibraryURL, function(apiCodeLibrary) {
		
		$html = '<tr>';					
		$html = $html + '<td width="50"></td>';					
		$html = $html + '<td style="padding-top: 0px; padding-bottom: 0px;">';				 													

	     $.each(apiCodeLibrary['libraries'], function(libraryKey, libraryVal) { 
	
	     	 $iconurl = libraryVal['icon-url']; 
	     	 $zipurl = apiVal['zip-url'];	      	 		 								
	     	 		
		 	 $html = $html + '<a href="' + $zipurl + '"><img src="' + $iconurl + '" width="60" style="display: inline; padding: 3px;" /></a>';																											 	
		 		
			);	
			
		$html = $html + '</td>';																	
		$html = $html + '</tr>';						
		$('#code-page').append($html); 			
												
		});	
		

	});	

	jqxhr.complete(function() {
              
        });		  
         	  	
    }   		
	}

function loadCodeFromAPIsJSON($apisjsonURL)
    {

	var jqxhr = $.getJSON($apisjsonURL, function(apisJSON) { 													

		buildCodeFromAPIsJSON(apisJSON);

	});	

	// Set another completion function for the request above
	jqxhr.complete(function() {
		
	  	//document.getElementById("jsonNavigator").style.display=''; 
	  	                 
        });		  
         	  	
    } 
    
function loadCodeFromAPIsJSON($apisjsonURL,$itemcount)
    {

	console.log("processing..." + $apisjsonURL + " (" + $itemcount + ")");

	var jqxhr = $.getJSON($apisjsonURL, function(apisJSON) { 													


		buildCodeFromAPIsJSON(apisJSON,$itemcount);

	});	

	jqxhr.complete(function() {
              
        });		  
         	  	
    }     

function buildCodeFromAPIsJSON(apisJSON)
	{

	$apisJSONName = apisJSON['name'];

 	$apisJSONDesc = apisJSON['description'];
 	$apisJSONLogo = apisJSON['image'];
 	$apisJSONURL = apisJSON['url'];
 	  
    apisJSONTags = apisJSON['tags'];            
    apisJSONAPIs = apisJSON['apis'];
    apisJSONIncludes = apisJSON['include'];
    apisJSONMaintainers = apisJSON['maintainers'];	
    
    howmanyapis = apisJSONAPIs.length;	
    howmanyincludes = apisJSONIncludes.length;
    
     $.each(apisJSONIncludes, function(apiKey, apiVal) { 

     	 $includeName = apiVal['name']; 
     	 $includeRootUrl = apiVal['url'];	      	 

		 if($includecount < 35)
		 	{	 		
		 	loadCodeFromAPIsJSON($includeRootUrl,$includecount);
		 	}		 		 
 
		 $includecount++;										
	});	

	}
	
function buildCodeFromAPIsJSON(apisJSON,$itemcount)
	{

	$apisJSONName = apisJSON['name'];

 	$apisJSONDesc = apisJSON['description'];
 	$apisJSONLogo = apisJSON['image'];
 	$apisJSONURL = apisJSON['url'];
 	  
    apisJSONTags = apisJSON['tags'];            
    apisJSONAPIs = apisJSON['apis'];
    
     $.each(apisJSONAPIs, function(apiKey, apiVal) { 

     	 $apiName = apiVal['name']; 
     	 $apiDesc = apiVal['description'];
     	 $apiImage = apiVal['image']; 
     	 $apiHumanURL = apiVal['humanURL']; 
     	 $apiBaseURL = apiVal['baseURL'];               	                         	 
		 $apiTags = apiVal['tags'];			 	 
		 
		 $apiProperties = apiVal['properties'];
		 $.each($apiProperties, function(propertyKey, propertyVal) { 

		 	$propertyType = propertyVal['type'];
		 	$propertyURL = propertyVal['url'];					 				 			 							 		 					 	
		 	;
		    if($propertyType=='x-api-code-libraries')
		    	{
		    	deployCodeMaster($propertyURL,$itemcount,$apiName);
		    	}	 	
	
		 	$propertycount++;
		 	
		 	}); 				 	                                           
        				 					 				 	 				 					 											
		 $apiContact = apiVal['contact'];
		 $apicount++;										
	});
		
	}	
