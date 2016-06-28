// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('badge', ['ionic', 'ngResource', 'badge.controllers', 'badge.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.login', {
    url: "/login",
    views: {
      'menuContent': {
        templateUrl: "templates/login.html",
        controller: 'LoginCtrl'
      }
    }
  })

  .state('app.badge', {
    url: "/badge",
      views: {
        'menuContent': {
          templateUrl: "templates/badge.html",
          controller: 'BadgeCtrl'
          }
        }
    })

  .state('app.profila', {
    url: "/profila",
      views: {
        'menuContent': {
          templateUrl: "templates/profila.html",
          controller: 'ProfilaCtrl'
          }
        }
  })

  .state('app.gestioneAttivita', {
    url: "/gestioneAttivita",
    views: {
      'menuContent': {
        templateUrl: "templates/gestioneAttivita.html",
        controller: 'GestioneCtrl'
      }
    }
  })

  .state('app.modificaPassword', {
    url: "/modificaPassword",
    views: {
      'menuContent': {
        templateUrl: "templates/modificaPassword.html",
        controller: 'PasswordCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
});