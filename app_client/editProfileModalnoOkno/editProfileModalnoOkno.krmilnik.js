(function() {
  function editProfileModalnoOkno($location, $uibModalInstance, podrobnostiUporabnika, dancingthingsMembers, avtentikacija) {

    var vm = this;
    vm.trenutnaLokacija = $location.path();
    vm.jePrijavljen = avtentikacija.jePrijavljen();

    vm.podrobnostiUporabnika=podrobnostiUporabnika;

    vm.modalnoOknoEditProfile = {
      preklici: function() {
        $uibModalInstance.close();
      },
      zapri: function(odgovor) {
        $uibModalInstance.close(odgovor);
      }
    };

    vm.posiljanjePodatkov = function() {
      vm.napakaNaObrazcu = "";
      if (!vm.podatkiObrazca.username && !vm.podatkiObrazca.email && !vm.podatkiObrazca.firstname
        && !vm.podatkiObrazca.city && !vm.podatkiObrazca.state && !vm.podatkiObrazca.dance) {
        vm.napakaNaObrazcu = "Prosim, izpolnite vsaj eno vnosno polje!";
        return false;
      } else {
        vm.urediUporabnika(vm.podatkiObrazca);
        return false;
      }
    };

    vm.urediUporabnika = function(podatkiObrazca) {
      dancingthingsMembers.editUser(vm.podrobnostiUporabnika.idUporabnika, {
        username: podatkiObrazca.username,
        firstname: podatkiObrazca.firstname,
        email: podatkiObrazca.email,
        city: podatkiObrazca.city,
        state: podatkiObrazca.state,
        dance: podatkiObrazca.dance
        
      }).then(
        function success(odgovor) {
          vm.modalnoOknoEditProfile.zapri(odgovor.data);
        },
        function error(odgovor) {
          vm.napakaNaObrazcu = "Napaka pri shranjevanju uporabnika, poskusite znova!";
        }
      );
    };
  }
  editProfileModalnoOkno.$inject = ['$location', '$uibModalInstance', 'podrobnostiUporabnika', 'dancingthingsMembers', 'avtentikacija'];

  /* global angular */
  angular
    .module('dancingthings')
    .controller('editProfileModalnoOkno', editProfileModalnoOkno);
})();