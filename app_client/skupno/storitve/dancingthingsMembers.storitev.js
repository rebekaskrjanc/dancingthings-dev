(function(){
  var dancingthingsMembers = function($http) {
    var allMembers = function() {
      return $http.get(
        '/api/users');
    };
    return {
      allMembers: allMembers,
      newMember: newMember
    };
  };

  dancingthingsMembers.$inject = ['$http'];
  
  /* global angular, $http */
  angular
    .module('dancingthings')
    .service('dancingthingsMembers', dancingthingsMembers);
})();