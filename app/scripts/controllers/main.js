'use strict';

/**
 * @ngdoc function
 * @name zyringApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the zyringApp
 */
angular.module('dataDashboard')
  .controller('MainCtrl', ['$scope', 'Traffic', function ($scope, Traffic) {
      $scope.trafficList = Traffic.query();
      console.log($scope.trafficList);
    }]);
