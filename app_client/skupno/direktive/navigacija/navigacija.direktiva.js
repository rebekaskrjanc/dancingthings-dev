(function() {
  var navigacija = function() {
    return {
      restrict: 'EA',
      templateUrl: '/skupno/direktive/navigacija/navigacija.predloga.html',
      controller: 'navigacijaCtrl',
      controllerAs: 'navvm'
    };
  };
  
  /* global angular */
  angular
    .module('dancingthings')
    .directive('navigacija', navigacija);
})();