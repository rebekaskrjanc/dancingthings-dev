(function() {
  function navigacijaCtrl($location, avtentikacija, $route) {
    var navvm = this;
    
    navvm.trenutnaLokacija = $location.path();
    navvm.jePrijavljen = avtentikacija.jePrijavljen();
    
    navvm.trenutniUporabnik = avtentikacija.trenutniUporabnik();

    navvm.odjava = function() {
      avtentikacija.odjava();
      $location.path('/');
      $route.reload();
    };
  }

  navigacijaCtrl.$inject = ['$location', 'avtentikacija', '$route'];

  /* global angular */
  angular
    .module('dancingthings')
    .controller('navigacijaCtrl', navigacijaCtrl);
})();