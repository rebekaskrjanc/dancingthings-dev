(function() {
  function groupModalnoOkno($location, $uibModalInstance, dancingthingsGroups, avtentikacija) {

    var vm = this;
    vm.trenutnaLokacija = $location.path();
    vm.jePrijavljen = avtentikacija.jePrijavljen();
    
    vm.trenutniUporabnik = avtentikacija.trenutniUporabnik();

    vm.modalnoOknoGroups = {
      preklici: function() {
        $uibModalInstance.close();
      },
      zapri: function(odgovor) {
        $uibModalInstance.close(odgovor);
      }
    };

    vm.posiljanjePodatkov = function() {
      vm.napakaNaObrazcu = "";
      if (!vm.podatkiObrazca.groupName) {
        vm.napakaNaObrazcu = "Prosim, izpolnite vsa vnosna polja!";
        return false;
      } else {
        vm.dodajSkupino(vm.podatkiObrazca);
        console.log(vm.podatkiObrazca);
        return false;
      }
    };
    vm.dodajSkupino = function(podatkiObrazca) {
      dancingthingsGroups.newGroup({
        groupName: podatkiObrazca.groupName,
        about: podatkiObrazca.about,
        groupAdmin: vm.trenutniUporabnik.username
      }).then(
        function success(odgovor) {
          vm.modalnoOknoGroups.zapri(odgovor.data);
        },
        function error(odgovor) {
          vm.napakaNaObrazcu = "Napaka pri shranjevanju skupine, poskusite znova!";
        }
      );
    };
  }
  groupModalnoOkno.$inject = ['$location', '$uibModalInstance', 'dancingthingsGroups', 'avtentikacija'];

  /* global angular */
  angular
    .module('dancingthings')
    .controller('groupModalnoOkno', groupModalnoOkno);
})();