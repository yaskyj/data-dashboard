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

        $scope.today = function() {
        $scope.dt = new Date();
        };
        $scope.today();

        $scope.clear = function () {
          $scope.dt = null;
        };

        // Disable weekend selection
        $scope.disabled = function(date, mode) {
          return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
        };

        $scope.toggleMin = function() {
          $scope.minDate = $scope.minDate ? null : new Date();
        };
        $scope.toggleMin();

        $scope.open = function($event) {
          $event.preventDefault();
          $event.stopPropagation();

          $scope.opened = true;
        };

        $scope.dateOptions = {
          formatYear: 'yy',
          startingDay: 1
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];
    }]);