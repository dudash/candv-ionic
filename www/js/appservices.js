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
	var headerColor = "bar-assertive";
	return {
	  headerClass: headerColor
	}
});
