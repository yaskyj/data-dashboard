'use strict';
dataDashboard
  .controller('MainCtrl', ['$scope', 'Traffic', 
    function ($scope, Traffic) {
      Traffic.query(function(data) {
        if (data) {
          $scope.trafficList = data;
          $scope.countryCount = _.countBy($scope.trafficList, 'country');
          $scope.countries = _.keys($scope.countryCount);
          $scope.visits = _.values($scope.countryCount);
          console.log(new Date($scope.trafficList[0].timestamp*1000));
        }
      });
    }]);