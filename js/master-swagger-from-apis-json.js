// Purposely keeping this verbose, and expanded, until I figure out best patterns for config and extensability

$apicount = 0;  
$propertycount = 0;

$includecount = 0;
	 	
// The Master 
$MasterAPISJSON = "";

$apipropertyoptions = "";
	
  function deploySwaggerMaster($swaggerURL)
  	{		
  		
  	  $swaggerContainer = "swagger-ui-container-" + $includecount;	
  		
	  $html = '<div class="swagger-section">';
	  $html = $html + '<div id="message-bar" class="swagger-ui-wrap">&nbsp;</div>';
	  $html = $html + '<div id="' + $swaggerContainer + '" class="swagger-ui-wrap"></div>';
	  $html = $html + '</div>';
	  console.log($html);
	  $('#master-swagger-section').append($html);  
  		
	  //var url = "https://kin-lane.github.io/" + $repo + "/swagger.json";
	  
	  window.swaggerUi = new SwaggerUi({
	    url: $swaggerURL,
	    dom_id: $swaggerContainer,
	    supportedSubmitMethods: ['get', 'post', 'put', 'delete', 'patch'],
	    onComplete: function(swaggerApi, swaggerUi){
	
	      var textboxes = document.getElementsByTagName("input");        

		  if($apikeys["API Evangelist"] === false)
		  	{
	      $appid = $apikeys["API Evangelist"]['appid'];
	      $appkey = $apikeys["API Evangelist"]['appkey'];

			for (var i=0;i<textboxes.length;i++)
			 	{
			    var textbox = textboxes[i];
			    if (textbox.type.toLowerCase() == "text")
			       {
			       if(textbox.name=='appid')
			       	{
			       	textboxes[i].value = $appid	;
			       	}
			       if(textbox.name=='appkey')
			       	{
			       	textboxes[i].value = $appkey;	
			       	}			       	
			     }
			 } 
			 }	
	
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
	
	  window.swaggerUi.load();	
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
    
function loadSwaggerFromAPIsJSON($apisjsonURL)
    {

	console.log("processing..." + $apisjsonURL);

	var jqxhr = $.getJSON($apisjsonURL, function(apisJSON) { 													


		buildSwaggerFromAPIsJSON(apisJSON);

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
		 if($includecount< 2)
		 	{
		 	loadSwaggerFromAPIsJSON($includeRootUrl);
		 	console.log("include (" + $includecount + "):" + $includeRootUrl);
		 	}		 		 
 
		 $includecount++;										
	});	

	}
	
function buildSwaggerFromAPIsJSON(apisJSON)
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
		    	console.log("API: " + $propertyURL);	
		    	//deploySwagger($propertyURL);
		    	setTimeout(deploySwaggerMaster($propertyURL), 3000);
		    	}	 	
	
		 	$propertycount++;
		 	
		 	}); 				 	                                           
        				 					 				 	 				 					 											
		 $apiContact = apiVal['contact'];
		 $apicount++;										
	});
		
	}	
