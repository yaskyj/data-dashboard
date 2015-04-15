angular.module('dataDashboard')
  .factory('Apartment',[
    '$resource',
    //myObj will be created by calling this function
    //and capturing its return value
    function($resource){
      return $resource('http://micky.zyring.com/fullEvents');
    }]);