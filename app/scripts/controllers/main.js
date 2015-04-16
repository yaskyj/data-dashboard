'use strict';
angular.module('dataDashboard')
  .controller('MainCtrl', ['$scope', 'Traffic', function ($scope, Traffic) {
    var getAllTraffic = function() {
      Traffic.getTraffic()
        .then(function(data) {
          if (data) {
            $scope.trafficList = data
            console.log($scope.trafficList);
          }
        }, function(error) {
            console.log(error);
        });
    }();
    console.log("This");
    console.log(typeof _);
  }]);
