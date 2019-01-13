(function() {
  function homepageCtrl($scope, $location, $uibModal, dancingthingsPodatki, avtentikacija) {
  	var vm = this;
    vm.jePrijavljen = avtentikacija.jePrijavljen();
    vm.prvotnaStran = $location.path();
    vm.trenutniUporabnik = avtentikacija.trenutniUporabnik();

    vm.pridobiPodatke = function() {
      vm.sporocilo = "Iščem bližnje lokacije.";

      dancingthingsPodatki.vsebinaObjave().then(
        function success(odgovor) {
          vm.objave=odgovor.data;
          
        }, function error(odgovor) {
          vm.sporocilo = "Prišlo je do napake!";
          console.log(odgovor.e);
        }
      );
    };
    vm.pridobiPodatke();

    vm.postUI = function(id, text) {
      var primerekModalnegaOkna = $uibModal.open({
        templateUrl: '/postModalnoOkno/postModalnoOkno.html',
        controller: 'postModalnoOkno',
        controllerAs: 'vm',
        resolve: {
          podrobnostiObjave: function() {
            return {
              idObjave: id,
              vsebina: text
            };
          }
        }
      });
      primerekModalnegaOkna.result.then(function(podatki) {
        if (typeof podatki != 'undefined')
          var i;
          for (i = 0; i < vm.objave.length; i++) { 
            if (vm.objave[i]._id==id)
              vm.objave[i].text= podatki.text,
              vm.objave[i].postAuthor= podatki.postAuthor
          }
          vm.pridobiPodatke();
        }, function(napaka) {
          // Ulovi dogodek in ne naredi ničesar
        });
    };

    vm.novaObjava = function(){
      dancingthingsPodatki.newPost({
        text: vm.podatkiObrazca.text,
        imeUporabnika: vm.trenutniUporabnik.username
        
      }).then(
        function success(odgovor) {
          console.log("uspešno");
          vm.pridobiPodatke();
        },
        function error(odgovor) {
          console.log("neuspešno", odgovor);
        }
      );

    }
    return vm;
  }
  homepageCtrl.$inject = ['$scope', '$location', '$uibModal', 'dancingthingsPodatki', 'avtentikacija'];

  /* global angular */
  angular
    .module('dancingthings')
    .controller('homepageCtrl', homepageCtrl);
})();