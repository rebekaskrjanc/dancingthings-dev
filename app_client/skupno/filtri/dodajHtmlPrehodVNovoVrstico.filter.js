(function() {
  var dodajHtmlPrehodVNovoVrstico = function() {
    return function(besedilo) {
      return besedilo.replace(/\n/g, '<br/>');
    };
  };
  
  /* global angular */
  angular
    .module('dancingthings')
    .filter('dodajHtmlPrehodVNovoVrstico', dodajHtmlPrehodVNovoVrstico);
})();