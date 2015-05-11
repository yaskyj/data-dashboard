'use strict';

Date.prototype.getWeek = function() {
  var onejan = new Date(this.getFullYear(), 0, 1);
  return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
};

angular.module('dataDashboard')
  .controller('LineByWeekCtrl', ['$scope',
    function($scope) {
      var updateLineByWeekTraffic = function () {
        //Visits by week
        $scope.weeklyCount = _.groupBy($scope.currentTraffic, function(item) {
          return new Date(item.timestamp * 1000).getWeek();
        });
        $scope.allWeeksInRange = _.range($scope.dtStart.getWeek(), $scope.dtEnd.getWeek() + 1);
        $scope.countByWeekRange = _.map($scope.allWeeksInRange, function(a) {
          return a in $scope.weeklyCount ? $scope.weeklyCount[a].length : 0;
        });
        $scope.countByWeekRange = [$scope.countByWeekRange];
        $scope.weekLabels = _.map($scope.allWeeksInRange, function(a, b) {
          return 'Week ' + (b + 1);
        });
        $scope.weekSeries = ['Visits'];
      };

      $scope.$watch('currentTraffic', function() {
        updateLineByWeekTraffic();
      });
    }]);