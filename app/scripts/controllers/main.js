'use strict';

Date.prototype.getWeek = function() {
        var onejan = new Date(this.getFullYear(), 0, 1);
        return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
};

angular.module('dataDashboard')
  .controller('MainCtrl', ['$scope', 'Traffic', '$state',
    function ($scope, Traffic, $state) {
      //Function which updates objects based on changes in dates
      $scope.updateCurrentTraffic = function() {
        //Gets all current traffic between specified dates
        $scope.currentTraffic = _.filter($scope.trafficList, function(item) {
          return ((item.timestamp * 1000) >= Date.parse($scope.dtStart)) && ((item.timestamp * 1000) <= Date.parse($scope.dtEnd));
        });
      };

      $scope.tabs = [
        {
          "heading": "Visits by Country",
          "active": false,
          route: "main.pieByCountry"
        },
        {
          "heading": "Visits by Week",
          "active": false,
          route: "main.lineByWeek"
        },
        {
          "heading": "Visits World Map",
          "active": false,
          route: "main.visitsWorldMap"
        }
      ];

      //For state changes
      $scope.go = function(route){
        $state.go(route);
      };

      $scope.active = function(route){
        return $state.is(route);
      };

      $scope.$on("$stateChangeSuccess", function() {
        $scope.tabs.forEach(function(tab) {
          tab.active = $scope.active(tab.route);
        });
      });

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