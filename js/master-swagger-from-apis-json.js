// Purposely keeping this verbose, and expanded, until I figure out best patterns for config and extensability

$apicount = 0;  
$propertycount = 0;

$includecount = 0;
	 	
// The Master 
$MasterAPISJSON = "";

$apipropertyoptions = "";
	

function loadMasterSwaggerFromAPIsJSON($apisjsonURL)
    {

	console.log("run1");
	var jqxhr = $.getJSON($apisjsonURL, function(apisJSON) { 													


		buildMasterSwaggerFromAPIsJSON(apisJSON);

	});	

	// Set another completion function for the request above
	jqxhr.complete(function() {
		
	  	//document.getElementById("jsonNavigator").style.display=''; 
	  	                 
        });		  
         	  	
    } 

function buildMasterSwaggerFromAPIsJSON(apisJSON)
	{
	console.log("run2");	
		
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
    
    if(howmanyincludes > howmanyapis)
    	{
	     $.each(apisJSONIncludes, function(apiKey, apiVal) { 
	
	     	 $includeName = apiVal['name']; 
	     	 $includeRootUrl = apiVal['url'];	      	 
	     	 $includeUrl = $includeRootUrl.replace("apis.json","");	 
			 
			 console.log($includeUrl);
	 
			 $includecount++;										
		});	
		}
	else
		{
			
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
			 			
			    if($propertyType=='Swagger')
			    	{
			    	console.log($propertyURL);	
			    	}	 	
		
			 	$propertycount++;
			 	
			 	}); 				 	                                           
	        				 					 				 	 				 					 											
			 $apiContact = apiVal['contact'];
			 $apicount++;										
		});
					
		}
		
	}
