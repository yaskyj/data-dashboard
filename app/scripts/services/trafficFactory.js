angular.module('dataDashboard')
  .factory('Traffic',[
    '$resource',
    //myObj will be created by calling this function
    //and capturing its return value
    function($resource){
      return $resource('http://micky.zyring.com/fullEvents');
    }]);