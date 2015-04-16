angular.module('dataDashboard')
  .factory('Traffic',[
    '$http',
    '$q',
    function($http, $q){
      return {
        getTraffic: function() {
          return $http.get('http://micky.zyring.com/fullEvents')
            .then(function(response) {
              if (typeof response.data === 'object') {
                return response.data;
              }
              else {
                return $q.reject(response.data);
              }
            }, function(response) {
                return $q.reject(response.data);
            });
        }
      } 
      // $resource('http://micky.zyring.com/fullEvents');
    }]);