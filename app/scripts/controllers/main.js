'use strict';
dataDashboard
  .controller('MainCtrl', ['$scope', 'Traffic', 
    function ($scope, Traffic) {
      Traffic.query(function(data) {
        if (data) {
          $scope.trafficList = data;
          // console.log($scope.trafficList);
          $scope.countryCount = _.countBy($scope.trafficList, 'country');
          // console.log($scope.countryCount);
          $scope.countries = _.keys($scope.countryCount);
          $scope.visits = _.values($scope.countryCount);        
        }
      });
    }]);