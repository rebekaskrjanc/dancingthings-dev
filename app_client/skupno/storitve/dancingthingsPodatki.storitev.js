(function(){
  var dancingthingsPodatki = function($http, avtentikacija) {
    var vsebinaObjave = function() {
      return $http.get(
        '/api/posts');
    };
    var newPost = function(podatki) {
      return $http.post('/api/posts', podatki, {
        headers: {
          Authorization: 'Bearer ' + avtentikacija.vrniZeton()
        }
      });
    };
    var editPost = function(id, podatki) {
      console.log("2. console", id, podatki);
      return $http.put('/api/posts/' + id, podatki, {
        headers: {
          Authorization: 'Bearer ' + avtentikacija.vrniZeton()
        }
      });
    };
    var deletePost = function(id) {
      return $http.delete('/api/posts/' + id, {
        headers: {
          Authorization: 'Bearer ' + avtentikacija.vrniZeton()
        }
      });
    };
    
    return {
      vsebinaObjave: vsebinaObjave,
      newPost: newPost,
      editPost: editPost,
      deletePost: deletePost
    }
  };
  

  dancingthingsPodatki.$inject = ['$http', 'avtentikacija'];
  
  /* global angular, $http */
  angular
    .module('dancingthings')
    .service('dancingthingsPodatki', dancingthingsPodatki);
})();
