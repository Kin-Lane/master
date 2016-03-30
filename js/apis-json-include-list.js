function APIJSONGetIncludeListing($includeName,$includeRootUrl,$includeUrl,$includecount)
	{
	$thisslug = $includeName.toLowerCase();
	$thisslug = $thisslug.replace(" ", "-");

  html = '<div style="margin-left: 35px; margin-right: 10px; padding: 10px; display: inline; border: 1px solid #000">';
  html = html + '<a href="' + $includeUrl + '" style="color: #000; font-size: 18px; text-decoration: none;" title="' + $includeName + '"><strong>' + $includeName + '</strong></a>';
  html = html + '</div>';

	return html;
	}

function loadAPIsJSONIncludeList($apisjsonURL)
	{
	var jqxhr = $.getJSON($apisjsonURL, function(apisJSON) {
		$MasterAPISJSON = apisJSON;
		buildAPIsJSONIncludeList(apisJSON);
		document.getElementById("jsonBrowser").style.display='';
		});
  }

function buildAPIsJSONIncludeList(apisJSON)
	{
	$apisJSONName = apisJSON['name'];
 	$apisJSONDesc = apisJSON['description'];

	$html = "<h1>" + $apisJSONName + "</h1>";
	$html = $html + "<p>" + $apisJSONDesc + "</p>";
	$('#jsonBrowser').append($html);

 	$apisJSONLogo = apisJSON['image'];
 	$apisJSONURL = apisJSON['url'];
  apisJSONTags = apisJSON['tags'];
  apisJSONIncludes = apisJSON['include'];
  apisJSONMaintainers = apisJSON['maintainers'];

  howmanyincludes = apisJSONIncludes.length;

  if(howmanyincludes>0)
  	{
		$includecount = 0;
    $.each(apisJSONIncludes, function(apiKey, apiVal) {
     		$includeName = apiVal['name'];
     	 	$includeRootUrl = apiVal['url'];
     	 	$includeUrl = $includeRootUrl.replace("apis.json","");
        $html = APIJSONGetIncludeListing($includeName,$includeRootUrl,$includeUrl,$includecount)
        $('#jsonBrowser').append($html);
		 	 	$includecount++;
			});
		}
	}
