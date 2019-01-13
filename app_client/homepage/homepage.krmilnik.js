(function() {
  function homepageCtrl($scope, $location, $uibModal, dancingthingsPodatki, avtentikacija, dancingthingsMembers, dancingthingsGroups) {
  	var vm = this;
    vm.jePrijavljen = avtentikacija.jePrijavljen();
    vm.prvotnaStran = $location.path();
    vm.trenutniUporabnik = avtentikacija.trenutniUporabnik();
    console.log(vm.trenutniUporabnik);
    vm.pagination = {
      search: '',
      page: 0
    }
    vm.currPage=1;
    
    vm.pridobiPodatke = function(currPage) {
      vm.sporocilo = "Iščem bližnje lokacije.";
      vm.pageNumber=1;
      vm.mejaUp=currPage*10;
      vm.mejaDown=vm.mejaUp-10;
      vm.objave=[];
      console.log(vm.mejaDown, vm.mejaUp);
      dancingthingsPodatki.vsebinaObjave().then(
        function success(odgovor) {
          vm.objavePredFiltrom=odgovor.data;
          vm.objavePredFiltrom.reverse();
          l=vm.objavePredFiltrom.length;
          while(l>10) {
            l-=10;
            vm.pageNumber+=1;
          }
          if(vm.mejaUp>vm.objavePredFiltrom.length){
            console.log("prvi");
            var i;
            for(i=vm.mejaDown; i<vm.objavePredFiltrom.length; i++){
              vm.objave.push(vm.objavePredFiltrom[i]);
            }
          }
          else {
            console.log("drugi");
            var r;
            for(r=vm.mejaDown; r<vm.mejaUp; r++){
              vm.objave.push(vm.objavePredFiltrom[r]);
            }
          }
          
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
    vm.pridobiPodatke(vm.currPage);

    vm.prevPage = function() {
      vm.currPage-=1;
      vm.pridobiPodatke(vm.currPage);
    }
    vm.nextPage = function() {
      vm.currPage+=1;
      vm.pridobiPodatke(vm.currPage);
    }



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
          vm.pridobiPodatke(vm.currPage);
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
          vm.pridobiPodatke(vm.currPage);
        },
        function error(odgovor) {
          console.log("neuspešno", odgovor);
        }
      );
    }

    vm.novKomentar = function(id, com, txt, author) {
      var primerekModalnegaOkna = $uibModal.open({
        templateUrl: '/commentModalnoOkno/commentModalnoOkno.html',
        controller: 'commentModalnoOkno',
        controllerAs: 'vm',
        resolve: {
          podrobnostiKom: function() {
            return {
              idObjave: id,
              komentarji: com,
              vsebina: txt,
              author: author
            };
          }
        }
      });
      primerekModalnegaOkna.result.then(function(podatki) {
        c=podatki.comments.split(",");
        if (typeof podatki != 'undefined'){
          var i;
          var j;
          for (i = 0; i < vm.objave.length; i++) { 
            //coms=vm.objave[i].comments+'';
            //comss=coms.split(",");
            //console.log("C",comss);
            if (vm.objave[i]._id==id)
              vm.objave[i].comments=c;
              //console.log("po foru",vm.objave[i].comments);
          }
          //vm.pridobiPodatke();
        }
      }, function(napaka) {
        // Ulovi dogodek in ne naredi ničesar
      });
    }
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

    vm.o=vm.objave+'';
    vm.displayItems = vm.o.slice(0, 3);
  
    vm.pageChanged = function() {
      var startPos = (vm.page - 1) * 3;
      //$scope.displayItems = $scope.totalItems.slice(startPos, startPos + 3);
      console.log(vm.page);
      return vm;
    }


    return vm;
  }
  homepageCtrl.$inject = ['$scope', '$location', '$uibModal', 'dancingthingsPodatki', 'avtentikacija', 'dancingthingsMembers', 'dancingthingsGroups'];

  /* global angular */
  angular
    .module('dancingthings')
    .controller('homepageCtrl', homepageCtrl);
})();