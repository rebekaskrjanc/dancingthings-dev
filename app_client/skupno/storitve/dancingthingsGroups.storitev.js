(function(){
  var dancingthingsGroups = function($http, avtentikacija) {
    var allGroups = function() {
      return $http.get(
        '/api/groups');
    };
    var newGroup = function(podatki) {
      console.log(podatki)
      return $http.post('/api/groups', podatki, {
        headers: {
          Authorization: 'Bearer ' + avtentikacija.vrniZeton()
        }
      });
    };
    var editGroup = function(id, podatki) {
      return $http.put('/api/groups/' + id, podatki, {
        headers: {
          Authorization: 'Bearer ' + avtentikacija.vrniZeton()
        }
      });
    };
    var deleteGroup = function(id) {
      return $http.delete('/api/groups/' + id, {
        headers: {
          Authorization: 'Bearer ' + avtentikacija.vrniZeton()
        }
      });
    };
    

    return {
      allGroups: allGroups,
      newGroup: newGroup,
      editGroup: editGroup,
      deleteGroup: deleteGroup
    };
  };

  dancingthingsGroups.$inject = ['$http', 'avtentikacija'];
  
  /* global angular, $http */
  angular
    .module('dancingthings')
    .service('dancingthingsGroups', dancingthingsGroups);
})();
