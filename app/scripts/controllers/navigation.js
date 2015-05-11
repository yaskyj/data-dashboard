'use strict';

angular.module('dataDashboard')
  .controller('NavigationCtrl', ['$scope', function($scope) {
    $scope.tabNav = [
      {link: 'main', name: 'Home', active: false},
      {link: 'about', name: 'About', active: false},
      {link: 'main', name: 'Contact', active: false}
    ];
  }]);