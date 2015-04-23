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
          return ((item.timestamp * 1000) >= Date.parse($scope.dtStart)) && ((item.timestamp * 1000) <= Date.parse($scope.dtEnd));
        });
        //Visits by country
        $scope.countryCount = _.countBy($scope.currentTraffic, 'country');
        $scope.countries = _.keys($scope.countryCount);
        $scope.visits = _.values($scope.countryCount);

        //Visits by week
        $scope.weeklyCount = _.sortBy(_.groupBy($scope.currentTraffic, function(item) {
          return new Date(item.timestamp * 1000).getWeek();
        }), function(a, b) {
          return parseInt(b);
        });
        $scope.allWeeksInRange = _.range(1, $scope.dtEnd.getWeek() + 1);
        console.log($scope.allWeeksInRange);
        console.log($scope.dtStart.getWeek());
        console.log($scope.dtEnd.getWeek());        
        $scope.labels = _.map($scope.weeklyCount, function(a, b) {
          return 'Week ' + (b + 1);
        });
        $scope.series = ['Visits'];
        $scope.data = _.map($scope.weeklyCount, function(a) {
          return a.length;
        });
        $scope.data = [$scope.data];
      };

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