/* global angular, $http */

var dancingthingsApp = angular.module('dancingthings', []);
console.log("connected");

var dancingthingsPodatki = function($http) {
  return $http.get('api/posts?text=prva')
  
};

var seznamObjavCtrl = function($scope, dancingthingsPodatki) {
  $scope.sporocilo = "Iščem bližnje lokacije.";
  dancingthingsPodatki.then(
    function success(odgovor) {
      $scope.sporocilo = odgovor.data.length > 0 ? "" : "Ne najdem lokacij.";
      $scope.data = {
        objave: odgovor.data
      };
    }, function error(odgovor) {
      $scope.sporocilo = "Prišlo je do napake!";
      console.log(odgovor.e);
    }
  );
};

dancingthingsApp
  .controller('seznamObjavCtrl', seznamObjavCtrl)
  .service('dancingthingsPodatki', dancingthingsPodatki);