(function() {
  function groupsCtrl($scope, $uibModal, dancingthingsGroups) {
  	var vm = this;
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
    
    /*vm.novaSkupina = function() {

      dancingthingsNewGroup.newGroup().then(
        function success(odgovor) {
          vm.groups=odgovor.data;
        }, function error(odgovor) {
          vm.sporocilo = "Prišlo je do napake!";
          console.log(odgovor.e);
        }
      );
    };*/

    return vm;
  }
  groupsCtrl.$inject = ['$scope', '$uibModal', 'dancingthingsGroups'];

  /* global angular */
  angular
    .module('dancingthings')
    .controller('groupsCtrl', groupsCtrl);
})();