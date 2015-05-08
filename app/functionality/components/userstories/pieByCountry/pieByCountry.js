'use strict';

dataDashboard
  .controller('PieByCountryCtrl', ['$scope',
    function($scope) {
      var updatePieCountryTraffic = function () {
        //Visits by country
        $scope.countryCount = _.countBy($scope.currentTraffic, 'country');
        $scope.countries = _.keys($scope.countryCount);
        $scope.visits = _.values($scope.countryCount);
        console.log("This is being called")
      };
      $scope.countryCount = _.countBy($scope.currentTraffic, 'country');
      $scope.countries = _.keys($scope.countryCount);
      $scope.visits = _.values($scope.countryCount);
      console.log('Test!');
      $scope.$watch(function() {
        //updatePieCountryTraffic();
        console.log("This is the watch")
      });
  }]);