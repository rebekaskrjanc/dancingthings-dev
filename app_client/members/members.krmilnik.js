(function() {
  function membersCtrl($scope, $location, $uibModal, dancingthingsMembers, dancingthingsPodatki, avtentikacija) {
  	var vm = this;
    vm.jePrijavljen = avtentikacija.jePrijavljen();
    vm.prvotnaStran = $location.path();
    vm.id=0;
    vm.name='';
    vm.nalaganje = "Loading posts."
    vm.trenutniUporabnik = avtentikacija.trenutniUporabnik();

    vm.glavaStrani = {
    

      naslov: 'EduGeoCache',
      podnaslov: 'Poiščite zanimive lokacije blizu vas!'
    };
    vm.pridobiUporabnike = function() {
      dancingthingsMembers.allMembers().then(
        function success(odgovor) {
          vm.users=odgovor.data;
          
        }, function error(odgovor) {
          vm.sporocilo = "Prišlo je do napake!";
          console.log(odgovor.e);
        }
      );
    };

    vm.pridobiUporabnike();

    vm.pridobiPodatke = function() {
      vm.sporocilo = "Iščem bližnje lokacije.";

      dancingthingsPodatki.vsebinaObjave().then(
        function success(odgovor) {
          vm.objave=odgovor.data;
          var h;
          for (h=0; h<vm.objave.length; h++) {
            coms=vm.objave[h].comments+'';
            coms=coms.split(',');
            vm.objave[h].comments=coms;
          }
          vm.objave.comments+'';
        }, function error(odgovor) {
          vm.sporocilo = "Prišlo je do napake!";
          console.log(odgovor.e);
        }
      );
    };
    vm.pridobiPodatke();

    vm.editProfileUI = function(u, v) {
      vm.name=v;
      var i;
      for (i = 0; i < u.length; i++) { 
        if (u[i].username==v)
          vm.id=u[i]._id;
          
      }
      var primerekModalnegaOknaEdit = $uibModal.open({
        templateUrl: '/editProfileModalnoOkno/editProfileModalnoOkno.html',
        controller: 'editProfileModalnoOkno',
        controllerAs: 'vm',
        resolve: {
          podrobnostiUporabnika: function() {
            return {
              idUporabnika: vm.id
            };
          }
        }
      });
      primerekModalnegaOknaEdit.result.then(function(podatki) {
        if (typeof podatki != 'undefined') 
          console.log("edit podatki",podatki);
          vm.trenutniUporabnik.username=podatki.username,
          vm.trenutniUporabnik.email=podatki.email
          console.log("spremenjen user",vm.trenutniUporabnik);
          var i;
          for (i = 0; i < vm.users.length; i++) { 
            if (vm.users[i].username==v) 
              vm.users[i].username= podatki.username,
              vm.users[i].email= podatki.email
          }
        }, function(napaka) {
          // Ulovi dogodek in ne naredi ničesar
        });
    };
    return vm;
  }
  membersCtrl.$inject = ['$scope', '$location', '$uibModal', 'dancingthingsMembers', 'dancingthingsPodatki', 'avtentikacija'];

  /* global angular */
  angular
    .module('dancingthings')
    .controller('membersCtrl', membersCtrl);
})();