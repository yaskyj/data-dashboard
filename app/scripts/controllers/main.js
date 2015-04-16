'use strict';
dataDashboard.controller('MainCtrl', ['$scope', 'Traffic', function ($scope, Traffic) {

    var getAllTraffic = function() {
      Traffic.getTraffic()
        .then(function(data) {
          if (data) {
            $scope.trafficList = data;
            // console.log($scope.trafficList);
            $scope.countryCount = _.countBy($scope.trafficList, 'country');
            // console.log($scope.countryCount);
            $scope.countries = _.map($scope.countryCount, function(a, b) {return b ? b : "Unknown";});
            $scope.visits = _.map($scope.countryCount, function(a, b) {return a;});
          }
        }, function(error) {
            console.log(error);
        });
    }();
  }]);
