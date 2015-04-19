'use strict';
dataDashboard.factory('Traffic',[
  '$resource',
  function($resource) {
    return $resource('http://micky.zyring.com/fullEvents');
  }]);