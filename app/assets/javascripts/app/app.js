'use strict';

angular.module("Fidget",  ['ngRoute',
                           'fidget.directives',
                           'fidget.controllers',
                           'fidget.services',
                           'fidget.factories',
                           'providers.firebase'])

.config(function($routeProvider, $locationProvider, firebaseProvider){
  $routeProvider

    .when('/', {
      templateUrl: 'home.html',
      controller: 'HomeCtrl as home'
    })

    .otherwise('/');

  $locationProvider.html5Mode(true);

  firebaseProvider.config.username = "";            // your account name here
  firebaseProvider.config.model    = "points";      // change model name to avoid collision

})

;

