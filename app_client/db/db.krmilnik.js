(function() {
  function dbCtrl($http, $location, dancingthingsGroups, avtentikacija, dancingthingsPodatki) {

    var vm = this;
    vm.trenutnaLokacija = $location.path();
    vm.jePrijavljen = avtentikacija.jePrijavljen();
    
    vm.trenutniUporabnik = avtentikacija.trenutniUporabnik();
    vm.prijavniPodatki = {
      username: "",
      email: "",
      password: "",
      firstname: "",
      city: "",
      state: "",
      dance: ""
    };

    vm.prvotnaStran = $location.search().stran || '/db';

    vm.posiljanjePodatkov = function(d) {
      console.log(d);
      vm.prijavniPodatki.dance=d;
      console.log("prijavni podatki",vm.prijavniPodatki);
      vm.napakaNaObrazcu = "";
      if (!vm.prijavniPodatki.username || !vm.prijavniPodatki.email || !vm.prijavniPodatki.password || !vm.prijavniPodatki.password2 || 
        !vm.prijavniPodatki.city || !vm.prijavniPodatki.state || !vm.prijavniPodatki.dance || !vm.prijavniPodatki.firstname) {
        vm.napakaNaObrazcu = "Zahtevani so vsi podatki, prosim poskusite znova!";
      	console.log(vm.prijavniPodatki.username, vm.prijavniPodatki.email, vm.prijavniPodatki.password, vm.prijavniPodatki.password2,
      		vm.prijavniPodatki.city, vm.prijavniPodatki.state, vm.prijavniPodatki.dance, vm.prijavniPodatki.firstname);
        return false;
      } else {
        vm.izvediRegistracijo(vm.prijavniPodatki);
      }
  	};

	  vm.izvediRegistracijo = function(podatki) {
	    console.log("izvajamR",podatki);
	    vm.napakaNaObrazcu = "";
	    avtentikacija
	      .registracija(podatki)
	      .then(
	        function(success) {
	          $location.search('stran', null);
	          $location.path(vm.prvotnaStran);
	        },
	        function(napaka) {
	          vm.napakaNaObrazcu = napaka.data.sporocilo;
	        }
	      );
	  };

    vm.posiljanjePodatkovSkupine = function() {
      vm.napakaNaObrazcu = "";
      if (!vm.groupName || !vm.aboutGroup) {
        vm.napakaNaObrazcu = "Prosim, izpolnite vsa vnosna polja!";
        return false;
      } else {
        vm.dodajSkupino(vm.groupName, vm.aboutGroup);
        return false;
      }
    };
    vm.dodajSkupino = function(name, aboutg) {
      dancingthingsGroups.newGroup({
        groupName: name,
        about: aboutg,
        groupAdmin: vm.trenutniUporabnik.username
      }).then(
        function success(odgovor) {
          alert("Group added successfully!");
        },
        function error(odgovor) {
        	alert("Group creation failed");
          vm.napakaNaObrazcu = "Napaka pri shranjevanju skupine, poskusite znova!";
        }
      );
    };

    vm.novaObjava = function(){
    	console.log("posti",vm.vsebinaObjave);
      dancingthingsPodatki.newPost({
        text: vm.vsebinaObjave,
        imeUporabnika: vm.trenutniUporabnik.username
        
      }).then(
        function success(odgovor) {
          alert("A new post was created, you can see it on the home page!");
        },
        function error(odgovor) {
          alert("Post creation failed");
        }
      );
    }
    vm.deleteDB = function() {
    	console.log("brišem...skor")
      return $http.get('/api/deleteUserDB').then(
        function success(odgovor) {
          alert("Database successfully dropped!");
        });
    };
 	} 
  dbCtrl.$inject = ['$http', '$location', 'dancingthingsGroups', 'avtentikacija', 'dancingthingsPodatki'];

  /* global angular */
  angular
    .module('dancingthings')
    .controller('dbCtrl', dbCtrl);
})();