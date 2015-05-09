'use strict';

dataDashboard
  .controller('NavigationCtrl', ['$scope', function($scope) {
    $scope.tabNav = [
      {link: 'main', name: 'Home', active: false},
      {link: 'about', name: 'About', active: false},
      {link: '#/', name: 'Contact', active: false}
    ];
  }]);