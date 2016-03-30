function APIJSONBrowserGetIncludeListing($includeName,$includeRootUrl,$includeUrl,$includecount)
	{
	$thisslug = $includeName.toLowerCase();
	$thisslug = $thisslug.replace(" ", "-");

  html = html + '<li style="width: 48%;">';
  html = html + '<a href="' + $includeUrl + '" style="color: #000; font-size: 18px; text-decoration: none;" title="' + $includeName + '"><strong>' + $includeName + '</strong></a>';
  html = html + ' (<a href="' + $includeUrl + '" style="color: #000; font-size: 18px; text-decoration: none;" title="' + $includeName + '">site</a>)';
  html = html + ' (<a href="' + $includeRootUrl + '" style="color: #000; font-size: 18px; text-decoration: none;" title="' + $includeName + '">apis.json</a>)';
  html = html + '</li>';

	return html;
	}

function loadAPIsJSONBrowser($apisjsonURL)
	{
	var jqxhr = $.getJSON($apisjsonURL, function(apisJSON) {
		$MasterAPISJSON = apisJSON;
		buildAPIsJSONBrowser(apisJSON);
		document.getElementById("jsonBrowser").style.display='';
		});
  }

function buildAPIsJSONBrowser(apisJSON)
	{
	$apisJSONName = apisJSON['name'];
 	$apisJSONDesc = apisJSON['description'];

	$html = "<h1>" + $apisJSONName + "</h1>";
	$html = $html + "<p>" + $apisJSONDesc + "</p>";
	$('#apisJSONListing').append($html);

 	$apisJSONLogo = apisJSON['image'];
 	$apisJSONURL = apisJSON['url'];
  apisJSONTags = apisJSON['tags'];
  apisJSONIncludes = apisJSON['include'];
  apisJSONMaintainers = apisJSON['maintainers'];

  howmanyincludes = apisJSONIncludes.length;

  if(howmanyincludes>0)
  	{
    $.each(apisJSONIncludes, function(apiKey, apiVal) {
     		$includeName = apiVal['name'];
     	 	$includeRootUrl = apiVal['url'];
     	 	$includeUrl = $includeRootUrl.replace("apis.json","");
        $html = APIJSONBrowserGetIncludeListing($includeName,$includeRootUrl,$includeUrl,$apicount)
        $('#apisJSONListing').append($html);
		 	 	$includecount++;
			});
		}
	}
