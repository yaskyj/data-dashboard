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
    var getAllTraffic = function() {
      Traffic.getTraffic()
        .then(function(data) {
          console.log("This");
          if (data) {
            $scope.trafficList = data
            console.log($scope.trafficList);
          }
        }, function(error) {
            console.log(error);
        });
    }();
    console.log("This");
  }]);
