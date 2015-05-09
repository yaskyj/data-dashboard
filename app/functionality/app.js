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
        templateUrl: './functionality/components/main.html',
        controller: 'MainCtrl'
      })
      .state('main.pieByCountry', {
        url: '/pieByCountry',
        templateUrl: './functionality/components/userstories/pieByCountry/pieByCountry.html',
        controller: 'PieByCountryCtrl'
      })
      .state('main.lineByWeek', {
        url: '/lineByWeek',
        templateUrl: './functionality/components/userstories/lineByWeek/lineByWeek.html',
        controller: 'LineByWeekCtrl'
      })
      .state('main.visitsWorldMap', {
        url: '/visitsWorldMap',
        templateUrl: './functionality/components/userstories/visitsWorldMap/visitsWorldMap.html',
        controller: 'VisitsWorldMapCtrl'
      })
      .state('about', {
        url: '/about',
        templateUrl: './functionality/components/about.html',
        controller: 'AboutCtrl'
      });
  }]);
//dataDashboard.config(function ($routeProvider) {
//    $routeProvider
//      .when('/', {
//        templateUrl: './functionality/components/main.html',
//        controller: 'MainCtrl'
//      })
//      .when('/about', {
//        templateUrl: './functionality/components/about.html',
//        controller: 'AboutCtrl'
//      })
//      .otherwise({
//        redirectTo: '/'
//      });
//});
