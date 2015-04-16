'use strict';
dataDashboard.controller('MainCtrl', ['$scope', 'Traffic', function ($scope, Traffic) {
    $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
    $scope.data = [300, 500, 100];
    var getAllTraffic = function() {
      Traffic.getTraffic()
        .then(function(data) {
          if (data) {
            $scope.trafficList = data;
            // console.log($scope.trafficList);
            $scope.countryCount = _.countBy($scope.trafficList, 'country');
            console.log($scope.countryCount);
          }
        }, function(error) {
            console.log(error);
        });
    }();
  }]);
