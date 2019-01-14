(function() {
  function prijavaCtrl($location, avtentikacija) {
    var vm = this;

    vm.glavaStrani = {
      naslov: "Prijava v Dancing Things"
    };

    vm.prijavniPodatki = {
      email: "",
      password: ""
    };

    vm.prvotnaStran = $location.search().stran || '/';

    vm.posiljanjePodatkov = function() {
      vm.napakaNaObrazcu = "";
      if (!vm.prijavniPodatki.email || !vm.prijavniPodatki.password) {
        vm.napakaNaObrazcu = "Zahtevani so vsi podatki, prosim poskusite znova!";
        return false;
      } else {
        vm.izvediPrijavo();
      }
    };

    vm.izvediPrijavo = function() {
      vm.napakaNaObrazcu = "";
      avtentikacija
        .prijava(vm.prijavniPodatki)
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
  prijavaCtrl.$inject = ['$location', 'avtentikacija'];

  /* global angular */
  angular
    .module('dancingthings')
    .controller('prijavaCtrl', prijavaCtrl);
})();