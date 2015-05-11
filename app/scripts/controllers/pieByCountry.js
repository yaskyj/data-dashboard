'use strict';

angular.module('dataDashboard')
  .controller('PieByCountryCtrl', ['$scope',
    function($scope) {
      var updatePieCountryTraffic = function () {
        //Visits by country
        $scope.countryCount = _.countBy($scope.currentTraffic, 'country');
        $scope.countries = _.keys($scope.countryCount);
        $scope.visits = _.values($scope.countryCount);
      };

      $scope.$watch('currentTraffic', function() {
        updatePieCountryTraffic();
      });
  }]);