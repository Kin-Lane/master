function APIJSONGetIncludeListing($includeName,$includeRootUrl,$includeUrl,$includecount,$includeToggle)
	{
	$thisslug = $includeName.toLowerCase();
	$thisslug = $thisslug.replace(" ", "-");

	html = '';
	if($includeToggle == 0) { html = html + '<div class="row">'; }
  html = html + '<div class="col-md-4">';
  html = html + '<a href="' + $includeUrl + '" style="color: #000; font-size: 18px; text-decoration: none;" title="' + $includeName + '"><strong>' + $includeName + '</strong></a>';
  html = html + '</div>';
	if($includeToggle == 1) { html = html + '</div>'; }

	return html;
	}

function loadAPIsJSONIncludeList($apisjsonURL)
	{
	var jqxhr = $.getJSON($apisjsonURL, function(apisJSON) {
		$MasterAPISJSON = apisJSON;
		buildAPIsJSONIncludeList(apisJSON);
		});
  }

function buildAPIsJSONIncludeList(apisJSON)
	{
	$apisJSONName = apisJSON['name'];
 	$apisJSONDesc = apisJSON['description'];

	$html = "<h1>" + $apisJSONName + "</h1>";
	$html = $html + "<p>" + $apisJSONDesc + "</p>";
	$('#includeHeader').append($html);

 	$apisJSONLogo = apisJSON['image'];
 	$apisJSONURL = apisJSON['url'];
  apisJSONTags = apisJSON['tags'];
  apisJSONIncludes = apisJSON['include'];
  apisJSONMaintainers = apisJSON['maintainers'];

  howmanyincludes = apisJSONIncludes.length;

  if(howmanyincludes>0)
  	{
		$includecount = 0;
		$includeToggle = 0;
    $.each(apisJSONIncludes, function(apiKey, apiVal) {
     		$includeName = apiVal['name'];
     	 	$includeRootUrl = apiVal['url'];
     	 	$includeUrl = $includeRootUrl.replace("apis.json","");
        $html = APIJSONGetIncludeListing($includeName,$includeRootUrl,$includeUrl,$includecount,$includeToggle)
        $('#includeListing').append($html);
				//$("#include" + $includecount).width(400).height(75);
		 	 	$includecount++;
				console.log($includeToggle);
				if($includeToggle==0){ $includeToggle = 1; } else { $includeToggle = 0; }
			});
		}
	}
