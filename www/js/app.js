// CandV App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'candv' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires', e.g. 'controllers' is found in controllers.js
angular.module('candv', ['ionic', 'ngCordova',
  'app.controller',
  'board.controllers',
  'board.services',
  'search.controller',
  'test.controllers']
)
//-----------------------------------------------------------------------------
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
//-----------------------------------------------------------------------------
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  // this is in testcontrollers.js
  .state('app.fhtest', {
      url: '/fhtest',
      views: {
        'menuContent': {
          templateUrl: 'templates/fhtest.html',
          controller: 'FHTest'
        }
      }
  })

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html',
        controller: 'SearchCtrl'
      }
    }
  })

  .state('app.boardslist', {
      url: '/boardslist',
      views: {
        'menuContent': {
          templateUrl: 'templates/boardslist.html',
          controller: 'BoardslistCtrl'
        }
      }
  })

  .state('app.board', {
      url: '/boards/:boardId',
      views: {
        'menuContent': {
          templateUrl: 'templates/board.html',
          controller: 'BoardCtrl'
        }
      }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/boards/0');
});
