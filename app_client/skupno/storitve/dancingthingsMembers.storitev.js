(function(){
  var dancingthingsMembers = function($http, avtentikacija) {
    var allMembers = function() {
      return $http.get(
        '/api/users');
    };
    var newMember = function(podatki) {
      return $http.post('/api/users', podatki);
    };
    var editUser = function(id, podatki) {
      return $http.put('/api/users/' + id, podatki, {
        headers: {
          Authorization: 'Bearer ' + avtentikacija.vrniZeton()
        }
      });
    };
    return {
      allMembers: allMembers,
      newMember: newMember,
      editUser: editUser
    };
  };

  dancingthingsMembers.$inject = ['$http', 'avtentikacija'];
  
  /* global angular, $http */
  angular
    .module('dancingthings')
    .service('dancingthingsMembers', dancingthingsMembers);
})();