angular.module('controllers', ['ng-mfb'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state, $ionicHistory) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Flag to say if we are logged in or not
  $scope.isLoggedIn = false;

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
  $scope.logout = function() {
    // TODO: any checks for sync or popup a "are you sure" can go here
    $scope.doLogout();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogout = function() {
    console.log('Doing logout', $scope.loginData);
    $scope.isLoggedIn = false;  // TODO: set this based on success/fail
    $ionicHistory.nextViewOptions({disableBack: true});
    $state.go('app.board', {board:0}, {location:'replace', reload:true});
  }

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    
    $scope.isLoggedIn = true;  // TODO: set this based on success/fail
    $ionicHistory.nextViewOptions({disableBack: true});
    $state.go('app.boardslist');

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

.controller('BoardslistCtrl', function($scope) {

  // TODO: get boards we can access from server

  $scope.boardslist = [
    { title: 'Global', id: 0 },
    { title: 'Work', id: 2 },
    { title: 'Home', id: 3 },
    { title: 'Shared by John', id: 4 },
  ];
})

.controller('BoardCtrl', function($scope, $stateParams) {

  // TODO: get this board data from server
  // demo data, TODO: remove this unless in OFFLINE_DEBUG 
  $scope.items = [
    { id: 0, raw: "copy me"},
    { id: 1, raw: "this is a test item"},
    { id: 2, raw: "duh"},
    { id: 3, raw: "http://angular-ui.github.io/ui-router/site/#/api/ui.router.state.$state"},
    { id: 4, raw: "http://angular-ui.github.io/bootstrap/"},
    { id: 5, raw: "https://openshift.feedhenry.com/"},
    { id: 6, raw: "https://www.redhat.com/en/about/value-of-subscription"},
    { id: 7, raw: "https://openapis.org/"}
  ];

  $scope.data = {
    showDelete: false
  };
  
  $scope.edit = function(item) {
    // TODO:
    alert('Edit Item: ' + item.id);
  };
  $scope.share = function(item) {
    // TODO:
    alert('Share Item: ' + item.id);
  };
  
  $scope.moveItem = function(item, fromIndex, toIndex) {
    $scope.items.splice(fromIndex, 1);
    $scope.items.splice(toIndex, 0, item);

    // TODO: update server
  };
  
  $scope.onItemDelete = function(item) {
    $scope.items.splice($scope.items.indexOf(item), 1);

    // TODO: update server
  };

  // popup a modal input to add data to the clipboard
  $scope.popupPasteInput = function(item) {
    // TODO:
    console.log("TODO popup");
  };

})

.controller("CopyPasteController", function($scope, $cordovaClipboard) {
    $scope.lastRawText = '';

    // copy argument value onto the clipboard
    $scope.copyItem = function(value) {
        $cordovaClipboard.copy(value).then(function() {
            console.log("Copied text");
        }, function() {
            console.error("There was an error copying");
        });
    }

    // paste the clipboard into the scope lastRawText
    $scope.pasteText = function() {
        $cordovaClipboard
            .paste()
            .then(function (result) {
                if(result) {
                    console.log("got text from clipboard: " + result);
                    $scope.lastRawText = result;
                } else {
                    // no result, clear results
                    console.error("There was an error pasting");
                    $scope.lastRawText = '';
                }
            }, function (e) {
                // error - do nothing cuz we don't care
            });
    };
});
