(function() {
  function commentModalnoOkno($location, $uibModalInstance, podrobnostiKom, dancingthingsPodatki, avtentikacija) {

    var vm = this;
    vm.trenutnaLokacija = $location.path();
    vm.jePrijavljen = avtentikacija.jePrijavljen();
    
    vm.trenutniUporabnik = avtentikacija.trenutniUporabnik();

    vm.podrobnostiKom=podrobnostiKom;
    vm.modalnoOknoComment = {
      preklici: function() {
        $uibModalInstance.close();
      },
      zapri: function(odgovor) {
        $uibModalInstance.close(odgovor);
      }
    };

    vm.zbrisiObjavo = function(id, com) {
      console.log("prvi", id, com);
      if(!id){
        vm.napakaNaObrazcu = "Napačen id skupine!";
        return false;
      } else {
        dancingthingsPodatki.deletePost(id).then(
          function success(odgovor) {
            vm.modalnoOknoComment.zapri(odgovor.data);
          },
          function error(odgovor) {
            vm.napakaNaObrazcu = "Napaka pri shranjevanju skupine, poskusite znova!";
          }
        );
      };
    }

    vm.posiljanjePodatkov = function(id, com, vsebina, author) {
      vm.napakaNaObrazcu = "";
      if (!vm.podatkiObrazca.text) {
        vm.napakaNaObrazcu = "Prosim, izpolnite vsaj eno vnosno polje!";
        return false;
      } else {
        console.log("drugi",id, com, vsebina, author);
        vm.urediObjavo(vm.podatkiObrazca, id, vsebina, com, author);
        
      }
    };

    vm.urediObjavo = function(podatkiObrazca, id, vsebina, com, author) {
      console.log("author",author);
      if (com==""){
        dancingthingsPodatki.editPost(id, {
          text: vsebina,
          postAuthor: author,
          comments: podatkiObrazca.text
        }).then(
          function success(odgovor) {
            console.log("data",odgovor.data);
            vm.modalnoOknoComment.zapri(odgovor.data);
          },
          function error(odgovor) {
            vm.napakaNaObrazcu = "Napaka pri shranjevanju skupine, poskusite znova!";
          }
        );
      } else {
        dancingthingsPodatki.editPost(id, {
          text: vsebina,
          postAuthor: author,
          comments: com + ',' + podatkiObrazca.text
        }).then(
          function success(odgovor) {
            vm.modalnoOknoComment.zapri(odgovor.data);
          },
          function error(odgovor) {
            vm.napakaNaObrazcu = "Napaka pri shranjevanju skupine, poskusite znova!";
          }
        );

      }
    };
  }
  commentModalnoOkno.$inject = ['$location', '$uibModalInstance', 'podrobnostiKom', 'dancingthingsPodatki', 'avtentikacija'];

  /* global angular */
  angular
    .module('dancingthings')
    .controller('commentModalnoOkno', commentModalnoOkno);
})();