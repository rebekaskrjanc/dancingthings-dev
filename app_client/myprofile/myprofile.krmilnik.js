(function() {
  function myprofileCtrl($scope, $location, $uibModal, dancingthingsMembers, avtentikacija) {
  	var vm = this;
    vm.jePrijavljen = avtentikacija.jePrijavljen();
    vm.prvotnaStran = $location.path();
    vm.glavaStrani = {
      naslov: 'EduGeoCache',
      podnaslov: 'Poiščite zanimive lokacije blizu vas!'
    };
    vm.users;
    vm.stranskaOrodnaVrstica = 'Iščete lokacijo za kratkočasenje? EduGeoCache vam pomaga pri iskanju zanimivih lokacij v bližini. Mogoče imate kakšne posebne želje? Naj vam EduGeoCache pomaga pri iskanju bližnjih zanimivih lokacij.';
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

    /*vm.editProfileUI = function(id, name) {
      console.log("bemts",id);
      var primerekModalnegaOknaEdit = $uibModal.open({
        templateUrl: '/editProfileModalnoOkno/editProfileModalnoOkno.html',
        controller: 'editProfileModalnoOkno',
        controllerAs: 'vm',
        resolve: {
          podrobnostiUporabnika: function() {
            return {
              idUporabnika: id
            };
          }
        }
      });
      primerekModalnegaOknaEdit.result.then(function(podatki) {
        if (typeof podatki != 'undefined')
          var i;
          for (i = 0; i < vm.groups.length; i++) { 
            if (vm.users[i]._id==id) {
              vm.users[i].username= podatki.username,
              vm.users[i].email= podatki.email
            }
          }
          //vm.groups.push(podatki);
        }, function(napaka) {
          // Ulovi dogodek in ne naredi ničesar
        });
    };
    */
    return vm;
  }
  
  myprofileCtrl.$inject = ['$scope', '$location', '$uibModal', 'dancingthingsMembers', 'avtentikacija'];

  /* global angular */
  angular
    .module('dancingthings')
    .controller('myprofileCtrl', myprofileCtrl);
})();