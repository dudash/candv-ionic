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
    getBoards: function(apiPrefix) {
      // TODO
      const URL = apiPrefix + '/boards';
      console.log('GET boards from ' + apiPrefix);

      $fh.cloud({
        "path": URL, //only the path part of the url, the host will be added automatically
        "method": "GET",   //all other HTTP methods are supported as well. e.g. HEAD, DELETE, OPTIONS
        "contentType": "application/json",
        "timeout": 25000 // timeout value specified in milliseconds. Default: 60000 (60s)
      }, function(res) {
        // Cloud call was successful. Alert the response
        console.log("**** FH SUCCESS ****");
        console.log(status);
        alert('Got response from cloud:' + JSON.stringify(res));
      }, function(msg,err) {
        // An error occured during the cloud call. Alert some debugging information
        console.log("**** FH ERROR ****");
        alert('Cloud call failed with error message:' + msg + '. Error properties:' + JSON.stringify(err));
      });
      // return a promise of the list
    },
    addBoard: function(apiPrefix, boardData) {
      // TODO
      const URL = apiPrefix + '/boards';
      console.log('POST board to ' + URL);

      $fh.cloud({
        "path": URL, //only the path part of the url, the host will be added automatically
        "method": "POST",   //all other HTTP methods are supported as well. e.g. HEAD, DELETE, OPTIONS
        "contentType": "application/json",
        "data": boardData, //data to send to the server
        "timeout": 25000 // timeout value specified in milliseconds. Default: 60000 (60s)
      }, function(res) {
        // Cloud call was successful. Alert the response
        console.log("**** FH SUCCESS ****");
        alert('Got response from cloud:' + JSON.stringify(res));
      }, function(msg,err) {
        // An error occured during the cloud call. Alert some debugging information
        console.log("**** FH ERROR ****");
        alert('Cloud call failed with error message:' + msg + '. Error properties:' + JSON.stringify(err));
      });
      // return a promise of the list
    }
  }
})

//-----------------------------------------------------------------------------
.factory('BoardItems', function() {
    return {
    getItems: function(apiPrefix) {
      // TODO
      const URL = apiPrefix + '/boards/0/items';
      console.log('GET items from ' + URL);
      // return a promise of the list
    },
    addItem: function() {
      // TODO
      const URL = apiPrefix + '/boards/0/items';
      console.log('POST item to ' + URL);
      // return a promise of the list
    }
  }
});
