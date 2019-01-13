(function() {
  function registracijaCtrl($location, avtentikacija) {
    var vm = this;

    vm.glavaStrani = {
      naslov: "Kreiranje novega Dancing Things uporabniškega računa"
    };

    vm.prijavniPodatki = {
      username: "",
      email: "",
      password: "",
      firstname: "",
      city: "",
      state: "",
      dance: ""
    };

    vm.prvotnaStran = $location.search().stran || '/';

    vm.posiljanjePodatkov = function() {
      vm.napakaNaObrazcu = "";
      if (!vm.prijavniPodatki.username || !vm.prijavniPodatki.email || !vm.prijavniPodatki.password || !vm.prijavniPodatki.password2 || 
        !vm.prijavniPodatki.city || !vm.prijavniPodatki.state || !vm.prijavniPodatki.dance || !vm.prijavniPodatki.firstname) {
        vm.napakaNaObrazcu = "Zahtevani so vsi podatki, prosim poskusite znova!";
        return false;
      } else {
        vm.izvediRegistracijo(vm.prijavniPodatki);
      }
  };

  vm.izvediRegistracijo = function() {
    vm.napakaNaObrazcu = "";
    avtentikacija
      .registracija(vm.prijavniPodatki)
      .then(
        function(success) {
          $location.search('stran', null);
          $location.path(vm.prvotnaStran);
        },
        function(napaka) {
          vm.napakaNaObrazcu = napaka.data.sporocilo;
        }
      );
  };
}
  registracijaCtrl.$inject = ['$location', 'avtentikacija'];

  /* global angular */
  angular
    .module('dancingthings')
    .controller('registracijaCtrl', registracijaCtrl);
})();