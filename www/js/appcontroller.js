// Author: @dudash | jdudash@redhat.com
// License: https://opensource.org/licenses/MIT

angular.module('app.controller', ['app.services'])
//-----------------------------------------------------------------------------
.controller('AppCtrl', function($scope, 
  $ionicModal, 
  $timeout, 
  $state, 
  $ionicHistory, 
  LoginHelper,
  SettingsHelper) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Settings Stuff ------------------------
  $scope.settings = SettingsHelper.loadSettingsFromStorage();  // load from storage first
  $ionicModal.fromTemplateUrl('templates/settings.html', {
    scope: $scope
  }).then(function(settingsModal) {
    $scope.settingsModal = settingsModal;
  });
  $scope.showSettings = function() {
    $scope.settingsModal.show();
  };
  $scope.closeSettings = function() {
    $scope.settingsModal.hide();
  };
  $scope.applySettings = function() {
    SettingsHelper.settings = $scope.settings;
    SettingsHelper.updateCalculatedSettings();  // update due to changes from user
    SettingsHelper.saveSettingsToStorage(); // save new values to storage
    $scope.closeSettings();
  };
  $scope.showHelpAndFeedback = function() {
    // TODO: show info about help and feedback form
  };
  

  // Login Stuff ------------------------
  // Flag to say if we are logged in or not
  $scope.isLoggedIn = LoginHelper.isLoggedIn;
  // Form data for the login modal
  $scope.loginData = {};
  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(loginModal) {
    $scope.loginModal = loginModal;
  });
  $scope.showlogin = function() {
    $scope.loginModal.show();
  };
  $scope.closeLogin = function() {
    $scope.loginModal.hide();
  };
  $scope.logout = function() {
    // TODO: any checks for sync or popup a "are you sure" can go here
    $scope.doLogout();
  };
  // Perform the login action when the user submits the login form
  $scope.doLogout = function() {
    console.log('Doing logout', $scope.loginData);
    
    LoginHelper.isLoggedIn = false; // TODO: set this based on success/fail
    $scope.isLoggedIn = LoginHelper.isLoggedIn;  

    $ionicHistory.nextViewOptions({disableBack: true});
    $state.go('app.board', {board:0}, {location:'replace', reload:true});
  }
  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    LoginHelper.isLoggedIn = true;
    $scope.isLoggedIn = LoginHelper.isLoggedIn;  // TODO: set this based on success/fail
    $scope.closeLogin(); // TODO: close after success, show error otherwise
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

});
