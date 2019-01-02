(function() {
  var glava = function() {
    return {
      restrict: 'EA',
      templateUrl: '/skupno/direktive/glava/glava.predloga.html'
    };
  };

  /* global angular */
  angular
    .module('dancingthings')
    .directive('glava', glava);
})();