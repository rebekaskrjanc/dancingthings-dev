(function(){
  var dancingthingsPodatki = function($http) {
    var vsebinaObjave = function() {
      return $http.get(
        '/api/posts');
    };
    
    return {
      vsebinaObjave: vsebinaObjave
    }
  };
  

  dancingthingsPodatki.$inject = ['$http'];
  
  /* global angular, $http */
  angular
    .module('dancingthings')
    .service('dancingthingsPodatki', dancingthingsPodatki);
})();
