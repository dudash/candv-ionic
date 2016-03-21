angular.module('board.controllers', ['ng-mfb', 'board.services'])

//-----------------------------------------------------------------------------
.controller('BoardslistCtrl', function($scope, BoardsList) {

  // TODO: get boards we can access from server
  $scope.boards = BoardsList.dummyboards;

  // --- Get data to refresh view ---
  $scope.doRefresh = function() {
    // TODO pull from server using service
    // $http.get('/new-items')
    //  .success(function(newItems) {
    //    $scope.items = newItems;
    //  })
    //  .finally(function() {
    //    // Stop the ion-refresher from spinning
    //    $scope.$broadcast('scroll.refreshComplete');
    //  });

    // for now just close the refresh
    $scope.$broadcast('scroll.refreshComplete');
  };
})


//-----------------------------------------------------------------------------
.controller('BoardCtrl', function($scope, $stateParams, $cordovaClipboard, BoardItems) {

  $scope.clipboardRaw = '';

  // TODO: get this board data from server
  $scope.items = BoardItems.dummyitems;

  // --- Get data to refresh view ---
  $scope.doRefresh = function() {
    // TODO pull from server using service
    // $http.get('/new-items')
    //  .success(function(newItems) {
    //    $scope.items = newItems;
    //  })
    //  .finally(function() {
    //    // Stop the ion-refresher from spinning
    //    $scope.$broadcast('scroll.refreshComplete');
    //  });

    // for now just close the refresh
    $scope.$broadcast('scroll.refreshComplete');
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
          alert('new item with: ' + $scope.clipboardRaw);
          // TODO: insert item to list on server and refresh
        } else {
          // no result, clear results
          console.error("There was an error pasting");
          $scope.clipboardRaw = '';
        }
      }, function (e) {
        // error - do nothing, we don't care
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


// //-----------------------------------------------------------------------------
// /// This might need to be removed and/or merged
// .controller("CopyPasteController", function($scope, $cordovaClipboard) {
//     $scope.lastRawText = '';

//     // copy argument value onto the clipboard
//     $scope.copyItem = function(value) {
//         $cordovaClipboard.copy(value).then(function() {
//             console.log("Copied text");
//         }, function() {
//             console.error("There was an error copying");
//         });
//     }

//     // paste the clipboard into the scope lastRawText
//     $scope.pasteText = function() {
//         $cordovaClipboard
//             .paste()
//             .then(function (result) {
//                 if(result) {
//                     console.log("got text from clipboard: " + result);
//                     $scope.lastRawText = result;
//                 } else {
//                     // no result, clear results
//                     console.error("There was an error pasting");
//                     $scope.lastRawText = '';
//                 }
//             }, function (e) {
//                 // error - do nothing cuz we don't care
//             });
//     };
// });
