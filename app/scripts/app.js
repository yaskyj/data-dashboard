'use strict';

/**
 * @ngdoc overview
 * @name zyringApp
 * @description
 * # zyringApp
 *
 * Main module of the application.
 */
var dataDashboard = angular.module('dataDashboard', ['ngAnimate', 'ngResource', 'ngRoute', 'ngTouch', 'chart.js', 'ui.bootstrap', 'datamaps', 'ui.router']);

dataDashboard
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .state('main.pieByCountry', {
        url: 'pieByCountry',
        templateUrl: 'views/pieByCountry.html',
        controller: 'PieByCountryCtrl'
      })
      .state('main.lineByWeek', {
        url: 'lineByWeek',
        templateUrl: 'views/lineByWeek.html',
        controller: 'LineByWeekCtrl'
      })
      .state('main.visitsWorldMap', {
        url: 'visitsWorldMap',
        templateUrl: 'views/visitsWorldMap.html',
        controller: 'VisitsWorldMapCtrl'
      })
      .state('about', {
        url: 'about',
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      });
  }]);
//dataDashboard.config(function ($routeProvider) {
//    $routeProvider
//      .when('/', {
//        templateUrl: './scripts/components/main.html',
//        controller: 'MainCtrl'
//      })
//      .when('/about', {
//        templateUrl: './scripts/components/about.html',
//        controller: 'AboutCtrl'
//      })
//      .otherwise({
//        redirectTo: '/'
//      });
//});
