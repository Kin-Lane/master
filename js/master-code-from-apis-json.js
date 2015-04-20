

function deployCodeMaster($codeLibraryURL,$apiName)
  	{		
  		
	console.log("processing..." + $codeLibraryURL);

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
	
			console.log(libraryVal);
	
	     	 $iconurl = libraryVal['icon-url']; 
	     	 $zipurl = libraryVal['zip-url'];	      	 		 								
	     	 		
		 	 $html = $html + '<a href="' + $zipurl + '"><img src="' + $iconurl + '" width="60" style="display: inline; padding: 3px;" /></a>';																											 	
		 		
			});	
			
		$html = $html + '</td>';																	
		$html = $html + '</tr>';						
		$('#code-page').append($html); 			
		
		});	

	jqxhr.complete(function() {
              
        });		           	  	
    }   		
    
function loadCodeFromAPIsJSON($apisjsonURL,$master)
    {

	console.log("processing..." + $apisjsonURL);

	var jqxhr = $.getJSON($apisjsonURL, function($apisJSON) { 													


		buildCodeFromAPIsJSON($apisJSON,$master);

	});	

	jqxhr.complete(function() {
              
        });		  
         	  	
    }     

function buildCodeFromAPIsJSON(apisJSON,$master)
	{

	$apisJSONName = apisJSON['name'];

 	$apisJSONDesc = apisJSON['description'];
 	$apisJSONLogo = apisJSON['image'];
 	$apisJSONURL = apisJSON['url'];
 	  
    apisJSONTags = apisJSON['tags'];            
    apisJSONAPIs = apisJSON['apis'];
    apisJSONIncludes = apisJSON['include'];
    apisJSONMaintainers = apisJSON['maintainers'];	

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

		    if($propertyType=='x-api-code-libraries')
		    	{
		    	deployCodeMaster($propertyURL,$apiName);
		    	}	 	

			}); 				 	                                           										
		}); 
 
    if($master==0)
    	{
	     $.each(apisJSONIncludes, function(apiKey, apiVal) { 
	
	     	 $includeName = apiVal['name']; 
	     	 $includeRootUrl = apiVal['url'];	      	 
	 		
			 loadCodeFromAPIsJSON($includeRootUrl,1);				 		 
	 
			 $includecount++;										
		  });	
		}
	}
