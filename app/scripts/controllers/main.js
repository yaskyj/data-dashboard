'use strict';
Date.prototype.getWeek = function() {
        var onejan = new Date(this.getFullYear(), 0, 1);
        return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
}

dataDashboard
  .controller('MainCtrl', ['$scope', 'Traffic',
    function ($scope, Traffic) {
      var updateCurrentTraffic = function() {
        $scope.currentTraffic = _.filter($scope.trafficList, function(item) {
          // 3918 US before
          return ((item.timestamp * 1000) >= Date.parse($scope.dtStart)) && ((item.timestamp * 1000) <= Date.parse($scope.dtEnd));
        });
        $scope.countryCount = _.countBy($scope.currentTraffic, 'country');
        $scope.countries = _.keys($scope.countryCount);
        $scope.visits = _.values($scope.countryCount);
      }

      $scope.today = function() {
        var currentYear = new Date().getFullYear();
        $scope.dtStart = new Date(currentYear,0,1);
        $scope.dtEnd = new Date(currentYear,11,31);
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

      $scope.$watch('[dtStart, dtEnd]', function() {
        updateCurrentTraffic();
      }, true);

      // $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
      Traffic.query(function(data) {
        if (data) {
          $scope.trafficList = data;
          updateCurrentTraffic();
        }
      });
    }]);