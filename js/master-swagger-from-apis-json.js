// Purposely keeping this verbose, and expanded, until I figure out best patterns for config and extensability

$apicount = 0;  
$propertycount = 0;

$includecount = 1;
	 	
// The Master 
$MasterAPISJSON = "";

$apipropertyoptions = "";

$APIsJSONSwaggerUI = Array();
	
  function deploySwaggerMaster($swaggerURL,$itemcount)
  	{		
  	  //alert('goodbye!');
  	 
  	  $swaggerContainer = "swagger-ui-container-" + $itemcount;	
  		
	  $html = '<div class="swagger-section">';
	  $html = $html + '<div id="message-bar" class="swagger-ui-wrap">&nbsp;</div>';
	  $html = $html + '<div id="' + $swaggerContainer + '" class="swagger-ui-wrap"></div>';
	  $html = $html + '</div>';
	  console.log($html);
	  $('#master-swagger-section').append($html);  
  		
	  //var url = "https://kin-lane.github.io/" + $repo + "/swagger.json";
	  
	  $APIsJSONSwaggerUI[$itemcount] = new SwaggerUi({
	  	
	    url: $swaggerURL,
	    dom_id: $swaggerContainer,
	    validatorUrl: null,
	    supportedSubmitMethods: ['get', 'post', 'put', 'delete', 'patch'],
	    onComplete: function(swaggerApi, swaggerUi){
	
	      $('pre code').each(function(i, e) {
	        hljs.highlightBlock(e)
	      });
	      
	    },
	    onFailure: function(data) {
	      log("Unable to Load SwaggerUI");
	    },
	    docExpansion: "none",
	    sorter : "alpha"
	  });
	
	  $APIsJSONSwaggerUI[$itemcount].load();	
  }

function loadMasterSwaggerFromAPIsJSON($apisjsonURL)
    {

	console.log("loading..." + $apisjsonURL);

	var jqxhr = $.getJSON($apisjsonURL, function(apisJSON) { 													


		buildMasterSwaggerFromAPIsJSON(apisJSON);

	});	

	// Set another completion function for the request above
	jqxhr.complete(function() {
		
	  	//document.getElementById("jsonNavigator").style.display=''; 
	  	                 
        });		  
         	  	
    } 
    
function loadSwaggerFromAPIsJSON($apisjsonURL,$itemcount)
    {

	console.log("processing..." + $apisjsonURL);

	var jqxhr = $.getJSON($apisjsonURL, function(apisJSON) { 													


		buildSwaggerFromAPIsJSON(apisJSON,$itemcount);

	});	

	// Set another completion function for the request above
	jqxhr.complete(function() {
		
	  	//document.getElementById("jsonNavigator").style.display=''; 
	  	                 
        });		  
         	  	
    }     

function buildMasterSwaggerFromAPIsJSON(apisJSON)
	{
	//console.log("run2");	
		
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
     	// $includeUrl = $includeRootUrl.replace("apis.json","");	 
		 //console.log($includecount);
		 if($includecount< 3)
		 	{
		 	window.setInterval(function () {loadSwaggerFromAPIsJSON($includeRootUrl,$includecount)}, 25000);	
		 	//setTimeout(loadSwaggerFromAPIsJSON($includeRootUrl,$includecount), 15000);
		 	//loadSwaggerFromAPIsJSON($includeRootUrl,$includecount);
		 	//console.log("include (" + $includecount + "):" + $includeRootUrl);
		 	}		 		 
 
		 $includecount++;										
	});	

	}
	
function buildSwaggerFromAPIsJSON(apisJSON,$itemcount)
	{
	//console.log("run3");	
		
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
		 	//console.log($propertyType);
		    if($propertyType=='swagger'||$propertyType=='Swagger')
		    	{
		    	console.log("Slowly Loading Swagger: " + $propertyURL);	
		    	//deploySwaggerMaster($propertyURL,$itemcount)
		    	window.setInterval(function () {deploySwaggerMaster($propertyURL,$itemcount)}, 25000);
		    	}	 	
	
		 	$propertycount++;
		 	
		 	}); 				 	                                           
        				 					 				 	 				 					 											
		 $apiContact = apiVal['contact'];
		 $apicount++;										
	});
		
	}	
