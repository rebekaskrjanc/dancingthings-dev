(function(){
  var dancingthingsGroups = function($http) {
    var allGroups = function() {
      return $http.get(
        '/api/groups');
    };
    var newGroup = function(podatki) {
      return $http.post('/api/groups', podatki);
    };
    return {
      allGroups: allGroups,
      newGroup: newGroup
    };
  };

  dancingthingsGroups.$inject = ['$http'];
  
  /* global angular, $http */
  angular
    .module('dancingthings')
    .service('dancingthingsGroups', dancingthingsGroups);
})();
