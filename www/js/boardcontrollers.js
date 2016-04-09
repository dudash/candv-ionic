// Author: @dudash | jdudash@redhat.com
// License: https://opensource.org/licenses/MIT

angular.module('board.controllers', ['ng-mfb', 'board.services'])

//-----------------------------------------------------------------------------
.controller('BoardslistCtrl', function($scope, BoardsList) {

  $scope.boards = [];
  BoardsList.getBoards($scope.REMOTE_SERVER_API_URL)
    .then(function(data) {
      $scope.boards = data;
    }).catch(function() {
      alert('error getting data from the server');
  });

  // --- Get data to refresh view ---
  $scope.doRefresh = function() {
    // TODO pull from server using service
    BoardsList.getBoards($scope.REMOTE_SERVER_API_URL)
      .then(function(data) {
        $scope.boards = data;
        $scope.$broadcast('scroll.refreshComplete');
      }).catch(function() {
        alert('error getting data from the server');
        $scope.$broadcast('scroll.refreshComplete');
    });
  };
})


//-----------------------------------------------------------------------------
.controller('BoardCtrl', function($scope, $stateParams, $cordovaClipboard, BoardItems) {

  $scope.clipboardRaw = '';
  $scope.items = [];
  BoardItems.getItems($scope.REMOTE_SERVER_API_URL)
    .then(function(data) {
      $scope.items = data;
    }).catch(function() {
      alert('error getting data from the server');
  });

  // --- Get data to refresh view ---
  $scope.doRefresh = function() {
    BoardItems.getItems($scope.REMOTE_SERVER_API_URL)
      .then(function(data) {
        $scope.items = data;
        $scope.$broadcast('scroll.refreshComplete');
      }).catch(function() {
        alert('error getting data from the server');
        $scope.$broadcast('scroll.refreshComplete');
    });
  };

  // --- Edit an Item ---
  $scope.editItem = function(item) {
    // TODO:
    alert('Edit Item: ' + item.id);
  };

  // --- Share an Item ---
  $scope.shareItem = function(item) {
    // TODO:
    alert('Share Item: ' + item.id);
  };
  
  // --- Move an Item in the List ---
  $scope.moveItem = function(item, fromIndex, toIndex) {
    $scope.items.splice(fromIndex, 1);
    $scope.items.splice(toIndex, 0, item);

    // TODO: update server
  };

  // --- Delete an Item  ---
  $scope.deleteItem = function(item) {
    $scope.items.splice($scope.items.indexOf(item), 1);

    // TODO: update server
  };

  // --- Popup to get Paste Text ---
  $scope.popupPasteInput = function() {
    // TODO:
    alert('TODO open keyboard and model to add data');
  };

  // --- Create and Item from Clipboard ---
  $scope.newFromClipboard = function() {
    $cordovaClipboard
      .paste().then(function (result) {
        if(result) {
          console.log("got text from clipboard: " + result);
          $scope.clipboardRaw = result;

          alert('new item with: ' + $scope.clipboardRaw);  // TODO: remove this
          // TODO: show a little indicator that the copy was successful (pop up for a second or so and then fade away)

          // TODO: insert item to list on server and refresh

        } else {
          // no result, clear results
          console.error("Clipboard empty");
          $scope.clipboardRaw = '';
          alert('Sorry, the clipboard is empty - no paste for you.');
        }
      }, function (e) {
        // error
        console.error("There was an error pasting");
        $scope.clipboardRaw = '';
        alert('Sorry, the clipboard is empty - no paste for you.');
    });
  };

  // --- Put text on clipboard ---
  $scope.putOnClipboard = function(value) {
    $cordovaClipboard.copy(value).then(function() {
        console.log("copied text");
        alert('put on clipboard: ' + value);
    }, function() {
        console.error("There was an error copying text to the clipboard.");
    });
  };

});

