(function() {
  function postModalnoOkno($location, $uibModalInstance, podrobnostiObjave, dancingthingsPodatki, avtentikacija) {

    var vm = this;
    vm.trenutnaLokacija = $location.path();
    vm.jePrijavljen = avtentikacija.jePrijavljen();
    
    vm.trenutniUporabnik = avtentikacija.trenutniUporabnik();

    vm.podrobnostiObjave=podrobnostiObjave;
    vm.modalnoOknoPost = {
      preklici: function() {
        $uibModalInstance.close();
      },
      zapri: function(odgovor) {
        $uibModalInstance.close(odgovor);
      }
    };

    vm.zbrisiObjavo = function(id) {
      if(!id){
        vm.napakaNaObrazcu = "Napačen id skupine!";
        return false;
      } else {
        dancingthingsPodatki.deletePost(id).then(
          function success(odgovor) {
            vm.modalnoOknoPost.zapri(odgovor.data);
          },
          function error(odgovor) {
            vm.napakaNaObrazcu = "Napaka pri shranjevanju skupine, poskusite znova!";
          }
        );
      };
    }

    vm.posiljanjePodatkov = function(id, author) {
      vm.napakaNaObrazcu = "";
      if (!vm.podatkiObrazca.text) {
        vm.napakaNaObrazcu = "Prosim, izpolnite vsaj eno vnosno polje!";
        return false;
      } else {
        vm.urediObjavo(vm.podatkiObrazca, id, author);
        
      }
    };

    vm.urediObjavo = function(podatkiObrazca, id, author) {
      console.log("log",id, podatkiObrazca);
      dancingthingsPodatki.editPost(id, {
        text: podatkiObrazca.text,
        postAuthor: author
      }).then(
        function success(odgovor) {
          vm.modalnoOknoPost.zapri(odgovor.data);
        },
        function error(odgovor) {
          vm.napakaNaObrazcu = "Napaka pri shranjevanju skupine, poskusite znova!";
        }
      );
    };
  }
  postModalnoOkno.$inject = ['$location', '$uibModalInstance', 'podrobnostiObjave', 'dancingthingsPodatki', 'avtentikacija'];

  /* global angular */
  angular
    .module('dancingthings')
    .controller('postModalnoOkno', postModalnoOkno);
})();