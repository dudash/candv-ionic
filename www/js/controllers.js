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

    // TODO:
    // OAuth 2.0 Example
    // OAuth does not require any params, instead the "authCallback" param should be set on the $fh.auth call.
    // This should be a function name that you have defined, and will be called after Auth has completed.
    $fh.auth({
      "policyId": "My OAuth Policy",
      "clientToken": "myAppId",
      "authCallback": "authLoginCallback",
      "endRedirectUrl": window.location.href
    }, function () {
      //
    }, function () {
      //
    });
    var authLoginCallback = function(err, res) {
      if (!err) {
        // Authentication successful - store sessionToken in variable
        var sessionToken = res.sessionToken;
      } else {
        alert("Authentication failed - " + err.message);
      }
    }

  };
})

.controller('FHTest', function($scope) {
  // add function to pass userInput to cloud via
  // $fh.cloud call to controller scope
  $scope.sayHello = function(userInput) {
    // TODO: not sure why $scope.userInput isn't working for this model and controller?  Subscope issues?

    //Notifying the user that the cloud endpoint is being called.
    $scope.noticeMessage = "trying to say hello...";
    $scope.textClassName = "ion-loading-c";

    // check if userInput is defined
    if (userInput) {

      var params = {
        path: 'hello',
        method: "GET",
        contentType: "application/json",
        data: { hello: userInput },
        timeout: 15000
      };

      $fh.cloud(params, function(response) {
          // If successful, display the length  of the string.
          if (response.msg != null && typeof(response.msg) !== 'undefined') {
            console.log("cloud API call success");
            $scope.noticeMessage = response.msg;
            $scope.textClassName = "ion-checkmark-round";
            $scope.$apply()
          } else {
            console.log("cloud API call error");
            $scope.noticeMessage  = "Error: Expected a message from $fh.cloud.";
            $scope.textClassName = "ion-close-round";
            $scope.$apply()
          }
        }, function(msg,err) {
          //If the cloud call fails
          $scope.noticeMessage = "$fh.cloud failed. Error: " + JSON.stringify(err);
          $scope.textClassName = "ion-close-round";
          $scope.$apply()
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
