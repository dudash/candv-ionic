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
  $scope.viewShowDelete = false;
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

  // --- Show/hide the edit menu ---
  $scope.toggleEdit = function() { 
    $scope.viewShowDelete = !$scope.viewShowDelete;
  };
  
  // --- Edit an Item ---
  $scope.editItem = function(item) {
    // TODO:
    alert('Error: edit unavailable - sorry.');
  };

  // --- Share an Item ---
  $scope.shareItem = function(item) {
    // TODO:
    alert('Error: share unavailable - sorry.');
  };
  
  // --- Move an Item in the List ---
  $scope.moveItem = function(item, fromIndex, toIndex) {
    $scope.items.splice(fromIndex, 1);
    $scope.items.splice(toIndex, 0, item);

    // FUTURE: update server list order

  };

  // --- Delete an Item  ---
  $scope.deleteItem = function(item) {
    BoardItems.deleteItem($scope.REMOTE_SERVER_API_URL, item)
      .then(function(status) {
        $scope.items.splice($scope.items.indexOf(item), 1);  // clear it from the local list
      }).catch(function() {
        alert('error deleting data from the server');
    });
  };

  // --- Popup to get Paste Text ---
  $scope.popupPasteInput = function() {
    // TODO: get data from keyboard input popup
    var item = {"raw": "TEST TESTING"};
    BoardItems.addItem($scope.REMOTE_SERVER_API_URL, item)
      .then(function(data) {
        $scope.items.unshift(item);
      }).catch(function() {
        alert('error adding data to the server');
    });
  };

  // --- Create and Item from Clipboard ---
  $scope.newFromClipboard = function() {
    $cordovaClipboard.paste().then(function (result) {
      if(result) {
        console.log("got text from clipboard: " + result);
        $scope.clipboardRaw = result;
        var item = {"raw": result};
        BoardItems.addItem($scope.REMOTE_SERVER_API_URL, item)
          .then(function(data) {
            $scope.items.unshift(item);
          }).catch(function() {
            alert('error adding data to the server');
        });
      } else {
        console.error("Clipboard empty");
        $scope.clipboardRaw = '';
        alert('Sorry, the clipboard is empty - no paste for you.');
      }
    }, function (e) {
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
        // TODO: show a little indicator that the copy was successful (pop up for a second or so and then fade away)
    }, function() {
        console.error("There was an error copying text to the clipboard.");
    });
  };

});

