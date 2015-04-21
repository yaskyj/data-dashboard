'use strict';
dataDashboard
  .controller('MainCtrl', ['$scope', 'Traffic',
    function ($scope, Traffic) {
      $scope.today = function() {
        $scope.dtStart = new Date().toDateString();
        $scope.dtEnd = new Date().toDateString();
      };
      $scope.format = 'yyyy-MM-dd';
      $scope.today();

      $scope.clear = function () {
        $scope.dtStart = null;
        $scope.dtEnd = null;
      };

      $scope.openStart = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.openedStart = true;
      };

      $scope.openEnd = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.openedEnd = true;
      };

      $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
      };

      // $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
      Traffic.query(function(data) {
        if (data) {
          $scope.trafficList = data;
          $scope.countryCount = _.countBy($scope.trafficList, 'country');
          $scope.countries = _.keys($scope.countryCount);
          $scope.visits = _.values($scope.countryCount);
          // console.log(new Date($scope.trafficList[0].timestamp*1000));
        }
      });
    }]);