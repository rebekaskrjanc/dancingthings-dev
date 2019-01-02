(function() {
  function membersCtrl($scope, dancingthingsMembers) {
  	var vm = this;
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

    return vm;
  }
  membersCtrl.$inject = ['$scope', 'dancingthingsMembers'];

  /* global angular */
  angular
    .module('dancingthings')
    .controller('membersCtrl', membersCtrl);
})();