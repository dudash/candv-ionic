angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('BrowseCtrl', function($scope) {
  // add function to pass userInput to cloud via
  // $fh.cloud call to controller scope
  $scope.sayHello = function() {
    var userInput = $scope.userInput;

    //Notifying the user that the cloud endpoint is being called.
    $scope.noticeMessage = "Calling Cloud Endpoint";
    $scope.textClassName = "ion-loading-c";

    // check if userInput is defined
    if (userInput) {
      /**
       * Pass the userInput to the service containing the $fh.cloud call.
       *
       * Notice that the defer.resolve and defer.reject functions are passed to the module.
       * One of these functions will be called when the $fh.cloud function has completed successully or encountered
       * an error.
       */
      fhcloud('hello', { hello: userInput })
        .then(function(response){
          // If successful, display the length  of the string.
          if (response.msg != null && typeof(response.msg) !== 'undefined') {
            $scope.noticeMessage = response.msg;
            $scope.textClassName = "ion-checkmark-round";
          } else {
            $scope.noticeMessage  = "Error: Expected a message from $fh.cloud.";
            $scope.textClassName = "ion-close-round";
          }
        })
        .catch(function(msg, err){
          //If the cloud call fails
          $scope.noticeMessage = "$fh.cloud failed. Error: " + JSON.stringify(err);
          $scope.textClassName = "ion-close-round";
        });
    }
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller("CopyPasteController", function($scope, $cordovaClipboard) {
    $scope.lastRawText = '';

    $scope.copyText = function(value) {
        $cordovaClipboard.copy(value).then(function() {
            console.log("Copied text");
        }, function() {
            console.error("There was an error copying");
        });
    }

    $scope.pasteText = function() {
        $cordovaClipboard
            .paste()
            .then(function (result) {
                if(result) {
                    console.log("got text from clipboard: " + result);
                    $scope.lastRawText = result;
                } else {
                    // no result, clear results
                    $scope.lastRawText = '';
                }
            }, function (e) {
                // error - do nothing cuz we don't care
            });
    };
});
