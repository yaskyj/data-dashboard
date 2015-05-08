'use strict';

/**
 * @ngdoc overview
 * @name zyringApp
 * @description
 * # zyringApp
 *
 * Main module of the application.
 */
var dataDashboard = angular.module('dataDashboard', ['ngAnimate', 'ngResource', 'ngRoute', 'ngTouch', 'chart.js', 'ui.bootstrap', 'datamaps']);

dataDashboard.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: './functionality/components/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: './functionality/components/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
});
