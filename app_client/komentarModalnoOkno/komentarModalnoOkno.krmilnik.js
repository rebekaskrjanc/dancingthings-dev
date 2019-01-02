(function() {
  function komentarModalnoOkno($uibModalInstance) {
    var vm = this;

    vm.modalnoOkno = {
      preklici: function() {
        $uibModalInstance.close();
      }
    };
  }
  komentarModalnoOkno.$inject = ['$uibModalInstance'];

  /* global angular */
  angular
    .module('dancingthings')
    .controller('komentarModalnoOkno', komentarModalnoOkno);
})();