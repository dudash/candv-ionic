// Author: @dudash | jdudash@redhat.com
// License: https://opensource.org/licenses/MIT

angular.module('app.services', [])

//-----------------------------------------------------------------------------
.factory('LoginHelper', function() {
  var isLoggedIn = false;

  return {
    isLoggedIn: isLoggedIn
    // TODO: login helper functions
  }
})

//-----------------------------------------------------------------------------
.factory('SettingsHelper', function() {
	var settings = {};
	// setup some deafults
  	settings.fhcloudurl = $fh.getCloudURL();  // try to request the URL from MAP for reference
  	settings.usefhcloud = true;
  	settings.cloudurl = settings.cloudurl = "http://localhost:8080";
  	settings.apiversion = "v0";
    settings.REMOTE_SERVER_API_URL = settings.cloudurl + "/api/" + settings.apiversion;
    console.log("setup defaults for settings");
	return {
		settings: settings,

		loadSettingsFromStorage: function() {
			console.log("loading settings from storage");
			
			// TODO:

			// update the calculated settings
			this.updateCalculatedSettings();
		},

		saveSettingsToStorage: function() {
			console.log("saving settings to storage");

			// TODO:
		},

		updateCalculatedSettings: function() {
			if (settings.usefhcloud) {
				settings.REMOTE_SERVER_API_URL = settings.fhcloudurl + "/api/" + settings.apiversion;
			} else {
				settings.REMOTE_SERVER_API_URL = settings.cloudurl + "/api/" + settings.apiversion;
			}
		}
	}
});
