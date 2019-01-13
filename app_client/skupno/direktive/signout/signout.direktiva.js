(function() {
  var signout = function() {
    return {
      restrict: 'EA',
      templateUrl: '/skupno/direktive/signout/signout.predloga.html',
      controller: 'signoutCtrl',
      controllerAs: 'navvm'
    };
  };
  
  /* global angular */
  angular
    .module('dancingthings')
    .directive('signout', signout);
})();