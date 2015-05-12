'use strict';
angular.module('dataDashboard')
  .factory('Keyword',['$resource',
    function($resource) {
      return $resource('http://micky.zyring.com/userQuestions');
    }]);