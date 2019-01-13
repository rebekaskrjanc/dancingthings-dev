(function(){
  function avtentikacija($window, $http) {
    var b64Utf8 = function (niz) {
      return decodeURIComponent(Array.prototype.map.call($window.atob(niz), function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
    };
    var shraniZeton = function(zeton) {
      $window.localStorage['dancingthings-zeton'] = zeton;
    };
    
    var vrniZeton = function() {
     return $window.localStorage['dancingthings-zeton'];
    };

    var registracija = function(uporabnik) {
      console.log("storitev",uporabnik);
      return $http.post('/api/registracija', uporabnik).then(
        function success(odgovor) {
          console.log("po apiju",odgovor.data);
          shraniZeton(odgovor.data.zeton);
        });
    };

    var prijava = function(uporabnik) {
      return $http.post('/api/prijava', uporabnik).then(
        function success(odgovor) {
          shraniZeton(odgovor.data.zeton);
        });
    };

    var odjava = function() {
      $window.localStorage.removeItem('dancingthings-zeton');
    };

    var jePrijavljen = function() {
      var zeton = vrniZeton();
      if (zeton) {
        var koristnaVsebina = JSON.parse(b64Utf8(zeton.split('.')[1]));
        return koristnaVsebina.datumPoteka > Date.now() / 1000;
      } else {
        return false;
      }
    };

    var trenutniUporabnik = function() {
      console.log("koristna vsebina",koristnaVsebina);
      if (jePrijavljen()) {
        var zeton = vrniZeton();
        var koristnaVsebina = JSON.parse(b64Utf8(zeton.split('.')[1]));
        return {
          email: koristnaVsebina.email,
          username: koristnaVsebina.username,
          firstname:koristnaVsebina.firstname,
          city: koristnaVsebina.city,
          state: koristnaVsebina.state,
          dance: koristnaVsebina.dance
        };
      }
    };

    return {
      shraniZeton: shraniZeton,
      vrniZeton: vrniZeton,
      registracija: registracija,
      prijava: prijava,
      odjava: odjava,
      jePrijavljen: jePrijavljen,
      trenutniUporabnik: trenutniUporabnik
    };
  };
  
  avtentikacija.$inject = ['$window', '$http'];
  
  /* global angular, $window, $http*/
  angular
    .module('dancingthings')
    .service('avtentikacija', avtentikacija);
})();

