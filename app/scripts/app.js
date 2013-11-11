'use strict';

angular.module('WhiteBoardApp', ['firebase', 'ngRoute', 'ngEkathuwa', 'angularBootstrapNavTree'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/classroom', {
        templateUrl: 'views/classroom.html',
        controller: 'ClassroomCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
