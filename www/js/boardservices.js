// Author: @dudash | jdudash@redhat.com
// License: https://opensource.org/licenses/MIT

// This module utilizes the a REST API for syncing clipboard items
//
// Note: You can swap this out and use the FH Sync API - find out how in the README-dev.md 
angular.module('board.services', [])

//-----------------------------------------------------------------------------
.factory('BoardsList', function($http) {
  var boards = [];
  
  return {
    getBoards: function(apiUrl) {
      const URL = apiUrl + '/boards';
      console.log('GET boards from ' + URL);
      return $http.get(URL)
        .success(function(data, status, headers, config){
          console.log("**** SUCCESS ****");
          console.log(status);
        })
        .error(function(data, status, headers, config){
          console.log("**** ERROR ****");
          console.log(JSON.stringify(config));
          console.log(status);
          // TODO: inform user of an error ("Couldn't get list from server")
          return null;
        })
        .then(function(response) {
          console.log('response = ' + JSON.stringify(response));
          boards = response.data;
          return boards;
        });  // return a promise of the list
    },

    addBoard: function(apiUrl, boardData) {
      // TODO: pass data
      $http.post('/boards');
    }
  }
})

//-----------------------------------------------------------------------------
.factory('BoardItems', function($http) {
    var items = [];
    
    return {
      getItems: function(apiUrl) {
        const URL = apiUrl + '/boards/0/items';
        console.log('GET items from ' + URL);
        return $http.get(URL)
          .success(function(data, status, headers, config){
            console.log("**** SUCCESS ****");
            console.log(status);
          })
          .error(function(data, status, headers, config){
            console.log("**** ERROR ****");
            console.log(JSON.stringify(config));
            console.log(status);
            // TODO: inform user of an error ("Couldn't get list from server")
            return null;
          })
          .then(function(response) {
            console.log('response = ' + JSON.stringify(response));
            items = response.data;
            return items;
          });  // return a promise of the list
      },

      addItem: function(apiUrl, itemData) {
        // TODO: pass data
        $http.post('/boards/0/items');
      }
    }
});
