// Purposely keeping this verbose, and expanded, until I figure out best patterns for config and extensability

$apicount = 0;
$propertycount = 0;

$includecount = 0;

// The Master
$MasterAPISJSON = "";
$apipropertyoptions = "";

// Localize Templating, making as editable as possible
function APIJSONBrowserGetHeaderCell(name,description,url,image,apijsonurl)
	{
	html = "";

    html = html + '<a href="' + url + '" title="' + name + '"><img src="' + image + '" width="175" align="left" style="padding: 15px;" /></a>';
    html = html + '<a href="' + url + '" style="color: #000; font-size: 22px; text-decoration: none;" title="' + name + '"><strong>' + name + '</strong></a>';
    html = html + '  (<a href="' + url + '" style="color: #000; font-size: 18px;" title="' + name + '">apis.json</a>)';
    html = html + '<br />' + description;

	return html;
	}

function APIJSONBrowserGetIncludeListing($includeName,$includeRootUrl,$includeUrl,$includecount)
	{

	$thisslug = $includeName.toLowerCase();
	$thisslug = $thisslug.replace(" ", "-");

	if($oAuth_Token!=''){ $includeUrl = $includeUrl + '?oAuth_Token=' + $oAuth_Token; }

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

		// Set our Master Store
		$MasterAPISJSON = apisJSON;

		buildAPIsJSONBrowser(apisJSON);

	});

	// Set another completion function for the request above
	jqxhr.complete(function() {

	  	document.getElementById("jsonBrowser").style.display='';

        });

    }

function buildAPIsJSONBrowser(apisJSON)
	{
	$apisJSONName = apisJSON['name'];

 	$apisJSONDesc = apisJSON['description'];
 	$apisJSONLogo = apisJSON['image'];
 	$apisJSONURL = apisJSON['url'];

 	// Header
    $html = APIJSONBrowserGetHeader($apisJSONName,$apisJSONDesc,$apisJSONURL,$apisJSONLogo,$apisJSONURL);
    $('#jsonBrowserHeaderTable').append($html);

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
        $('#jsonBrowserIncludeTable').append($html);
		 	 	$includecount++;

			});

		}
	}
