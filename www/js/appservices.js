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
.factory('SettingsHelper', ['$window', function($window) {
	var settings = {};

	// setup some deafults
  	settings.fhcloudurl = $fh.getCloudURL();  // try to request the URL from MAP for reference
  	settings.usefhcloud = true;
  	settings.cloudurl = settings.cloudurl = "http://localhost:8080";
  	settings.apiversion = "v0";
    settings.REMOTE_SERVER_API_URL = settings.cloudurl + "/api/" + settings.apiversion;

	return {
		settings: settings,

		loadSettingsFromStorage: function() {
			console.log("loading settings from storage...");
			var checkedsettings = JSON.parse($window.localStorage["settings"] || false);
			if (!checkedsettings) {
				console.log("WARNING: no previous settings, not loading from storage");
			} else {
				settings = checkedsettings;
				console.log("loaded: " + JSON.stringify(settings));
			}
			this.updateCalculatedSettings(); // update the calculated settings
			return settings;
		},

		saveSettingsToStorage: function() {
			console.log("saving settings to storage...");
			$window.localStorage["settings"] = JSON.stringify(settings);
			console.log("saved: " + JSON.stringify(settings));
		},

		updateCalculatedSettings: function() {
			if (settings.usefhcloud) {
				settings.REMOTE_SERVER_API_URL = settings.fhcloudurl + "/api/" + settings.apiversion;
			} else {
				settings.REMOTE_SERVER_API_URL = settings.cloudurl + "/api/" + settings.apiversion;
			}
		},

		deleteSavedSettings: function() {
			$window.localStorage.clear();
		}
	}
}]);
