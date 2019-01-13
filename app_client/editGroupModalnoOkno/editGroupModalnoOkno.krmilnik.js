(function() {
  function editGroupModalnoOkno($location, $uibModalInstance, podrobnostiSkupine, dancingthingsGroups, avtentikacija) {

    var vm = this;
    vm.trenutnaLokacija = $location.path();
    vm.jePrijavljen = avtentikacija.jePrijavljen();
    
    vm.trenutniUporabnik = avtentikacija.trenutniUporabnik();

    vm.podrobnostiSkupine=podrobnostiSkupine;
    vm.modalnoOknoEditGroups = {
      preklici: function() {
        $uibModalInstance.close();
      },
      zapri: function(odgovor) {
        $uibModalInstance.close(odgovor);
      }
    };

    vm.zbrisiSkupino = function() {
      vm.id=podrobnostiSkupine.idSkupine;
      if(!vm.id){
        vm.napakaNaObrazcu = "Napačen id skupine!";
        return false;
      } else {
        dancingthingsGroups.deleteGroup(vm.id).then(
          function success(odgovor) {
            vm.modalnoOknoEditGroups.zapri(odgovor.data);
          },
          function error(odgovor) {
            vm.napakaNaObrazcu = "Napaka pri shranjevanju skupine, poskusite znova!";
          }
        );
      };
    }

    vm.posiljanjePodatkov = function(id) {
      vm.napakaNaObrazcu = "";
      if (!vm.podatkiObrazca.groupName && !vm.podatkiObrazca.about) {
        vm.napakaNaObrazcu = "Prosim, izpolnite vsaj eno vnosno polje!";
        return false;
      } else {
        vm.urediSkupino(vm.podatkiObrazca, id);
        
      }
    };

    vm.urediSkupino = function(podatkiObrazca, id) {
      dancingthingsGroups.editGroup(id, {
        groupName: podatkiObrazca.groupName,
        about: podatkiObrazca.about
        
      }).then(
        function success(odgovor) {
          vm.modalnoOknoEditGroups.zapri(odgovor.data);
        },
        function error(odgovor) {
          vm.napakaNaObrazcu = "Napaka pri shranjevanju skupine, poskusite znova!";
        }
      );
    };
  }
  editGroupModalnoOkno.$inject = ['$location', '$uibModalInstance', 'podrobnostiSkupine', 'dancingthingsGroups', 'avtentikacija'];

  /* global angular */
  angular
    .module('dancingthings')
    .controller('editGroupModalnoOkno', editGroupModalnoOkno);
})();