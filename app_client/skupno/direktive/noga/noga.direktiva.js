(function() {
  var noga = function() {
    return {
      restrict: 'EA',
      templateUrl: '/skupno/direktive/noga/noga.predloga.html'
    };
  };
  
  /* global angular */
  angular
    .module('dancingthings')
    .directive('noga', noga);
})();