// Author: @dudash | jdudash@redhat.com
// License: https://opensource.org/licenses/MIT

// This module utilizes the Feed Henry API for syncing clipboard items (vs CandV REST API) 
//
// Note: You can swap this in by editing the index.html, app.js, and boardcontrollers.js
// swapping this in means swapping out the boardservices.js file that accesses the REST API
// read more in the README-dev.md 
angular.module('board.services.fh', [])

//-----------------------------------------------------------------------------
.factory('BoardsList', function() {
  return {
    getBoards: function(index) {
      // TODO
    },
    addBoard: function() {
      // TODO
    }
  }
})

//-----------------------------------------------------------------------------
.factory('BoardItems', function() {
    return {
    getItems: function(index) {
      // TODO
    },
    addItem: function() {
      // TODO
    }
  }
});
