(function() {
  function homepageCtrl($scope, $uibModal, dancingthingsPodatki) {
  	var vm = this;
    vm.glavaStrani = {

      naslov: 'EduGeoCache',
      podnaslov: 'Poiščite zanimive lokacije blizu vas!'
    };

    vm.stranskaOrodnaVrstica = 'Iščete lokacijo za kratkočasenje? EduGeoCache vam pomaga pri iskanju zanimivih lokacij v bližini. Mogoče imate kakšne posebne želje? Naj vam EduGeoCache pomaga pri iskanju bližnjih zanimivih lokacij.';
    //vm.objava = {
    //  text: 'Prva objava v Angular'
    //}
    vm.sporocilo = "Pridobivam trenutno lokacijo.";

    vm.prikaziPojavnoOknoObrazca = function() {
      $uibModal.open({
        templateUrl: '/komentarModalnoOkno/komentarModalnoOkno.pogled.html',
        controller: 'komentarModalnoOkno',
        controllerAs: 'vm',
        
      });
    
      //alert("Dodajmo komentar!");
    };

    vm.pridobiPodatke = function() {
      console.log("kr")
      //var text = objava.text;
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

    return vm;
  }
  homepageCtrl.$inject = ['$scope', '$uibModal', 'dancingthingsPodatki'];

  /* global angular */
  angular
    .module('dancingthings')
    .controller('homepageCtrl', homepageCtrl);
})();