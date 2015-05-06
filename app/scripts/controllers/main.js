'use strict';

Date.prototype.getWeek = function() {
        var onejan = new Date(this.getFullYear(), 0, 1);
        return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
};

dataDashboard
  .controller('MainCtrl', ['$scope', 'Traffic',
    function ($scope, Traffic) {

      //Function which updates objects based on changes in dates
      $scope.updateCurrentTraffic = function() {

        //Gets all current traffic between specified dates
        $scope.currentTraffic = _.filter($scope.trafficList, function(item) {
          return ((item.timestamp * 1000) >= Date.parse($scope.dtStart)) && ((item.timestamp * 1000) <= Date.parse($scope.dtEnd));
        });

        //Visits by country
        $scope.countryCount = _.countBy($scope.currentTraffic, 'country');
        $scope.countries = _.keys($scope.countryCount);
        $scope.visits = _.values($scope.countryCount);

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
        $scope.map = {
          type: 'usa',
          data: [{
            values: [
              { "location": "USA", "value": 125 },
              { "location": "CAN", "value": 50 },
              { "location": "FRA", "value": 70 },
              { "location": "RUS", "value": 312 }
            ]
          }],
          colors: ['#666666', '#b9b9b9', '#fafafa'],
          options: {
            width: 1110,
            legendHeight: 60 // optionally set the padding for the legend
          }
        }
      };

      $scope.tabs = [
        {
          "heading": "Visits by Country",
          "active": false,
          "template": "views/partials/pieByCountry.html"
        },
        {
          "heading": "Visits by Week",
          "active": false,
          "template": "views/partials/lineByWeek.html"
        },
        {
          "heading": "Visits World Map",
          "active": false,
          "template": "views/partials/visitsWorldMap.html"
        }
      ];

      //Date settings
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

      //Watches for changes in dates
      $scope.$watch('[dtStart, dtEnd, tabs]', function() {
        $scope.updateCurrentTraffic();
      }, true);

      //Query to get all traffic from API
      Traffic.query(function(data) {
        if (data) {
          $scope.trafficList = data;
          $scope.updateCurrentTraffic();
        }
        else {
          console.log('There was an error!');
        }
      });
    }]);