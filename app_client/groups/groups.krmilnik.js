(function() {
  function groupsCtrl($scope, $location, $uibModal, dancingthingsGroups, avtentikacija) {
  	var vm = this;
    vm.jePrijavljen = avtentikacija.jePrijavljen();
    
    vm.prvotnaStran = $location.path();
    vm.trenutniUporabnik = avtentikacija.trenutniUporabnik();

    vm.glavaStrani = {

      naslov: 'EduGeoCache',
      podnaslov: 'Poiščite zanimive lokacije blizu vas!'
    };
    vm.pridobiSkupine = function() {

      dancingthingsGroups.allGroups().then(
        function success(odgovor) {
          vm.groups=odgovor.data;
          
        }, function error(odgovor) {
          vm.sporocilo = "Prišlo je do napake!";
          console.log(odgovor.e);
        }
      );
    };
    

    vm.pridobiSkupine();

    vm.groupUI = function() {
      var primerekModalnegaOkna = $uibModal.open({
        templateUrl: '/groupModalnoOkno/groupModalnoOkno.pogled.html',
        controller: 'groupModalnoOkno',
        controllerAs: 'vm',
      });
      primerekModalnegaOkna.result.then(function(podatki) {
        if (typeof podatki != 'undefined')
          vm.groups.push(podatki);
        }, function(napaka) {
          // Ulovi dogodek in ne naredi ničesar
        });
    };


    vm.editGroupUI = function(id, name) {
      var primerekModalnegaOknaEdit = $uibModal.open({
        templateUrl: '/editGroupModalnoOkno/editGroupModalnoOkno.html',
        controller: 'editGroupModalnoOkno',
        controllerAs: 'vm',
        resolve: {
          podrobnostiSkupine: function() {
            return {
              idSkupine: id,
              name: name
            };
          }
        }
      });
      primerekModalnegaOknaEdit.result.then(function(podatki) {
        if (typeof podatki != 'undefined')
          var i;
          for (i = 0; i < vm.groups.length; i++) { 
            if (vm.groups[i]._id==id)
              vm.groups[i].groupName= podatki.groupName,
              vm.groups[i].about= podatki.groupName
          }
          vm.pridobiSkupine()
        }, function(napaka) {
          // Ulovi dogodek in ne naredi ničesar
        });
    };

    return vm;
  }
  groupsCtrl.$inject = ['$scope', '$location','$uibModal', 'dancingthingsGroups', 'avtentikacija'];

  /* global angular */
  angular
    .module('dancingthings')
    .controller('groupsCtrl', groupsCtrl);
})();