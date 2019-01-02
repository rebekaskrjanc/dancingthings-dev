(function() {
  function groupModalnoOkno($uibModalInstance, dancingthingsGroups) {
    var vm = this;

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
        about: podatkiObrazca.about
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
  groupModalnoOkno.$inject = ['$uibModalInstance', 'dancingthingsGroups'];

  /* global angular */
  angular
    .module('dancingthings')
    .controller('groupModalnoOkno', groupModalnoOkno);
})();