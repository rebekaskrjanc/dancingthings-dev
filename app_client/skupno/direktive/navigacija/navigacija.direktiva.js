(function() {
  var navigacija = function() {
    return {
      restrict: 'EA',
      templateUrl: '/skupno/direktive/navigacija/navigacija.predloga.html'
    };
  };
  
  /* global angular */
  angular
    .module('dancingthings')
    .directive('navigacija', navigacija);
})();