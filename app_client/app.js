(function(){

  function nastavitev($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
      	templateUrl: 'homepage/homepage.news.html',
      	controller: 'homepageCtrl',
      	controllerAs: 'vm'
      })
      .when('/groups', {
        templateUrl: 'groups/pogledi/groups.pogled.html',
        controller: 'groupsCtrl',
        controllerAs: 'vm'
      })
      .when('/members', {
        templateUrl: 'members/pogledi/members.pogled.html',
        controller: 'membersCtrl',
        controllerAs: 'vm'
      })
      .when('/myprofile', {
        templateUrl: 'myprofile/pogledi/myprofile.pogled.html',
        controller: 'membersCtrl',
        controllerAs: 'vm'
      })
      .when('/signup', {
        templateUrl: 'signup/pogledi/signup.pogled.html',
        //controller: 'signupCtrl',
        controllerAs: 'vm'
      })
      .when('/registracija', {
        templateUrl: '/avtentikacija/registracija/registracija.pogled.html',
        controller: 'registracijaCtrl',
        controllerAs: 'vm'
      })
      .when('/prijava', {
      templateUrl: '/avtentikacija/prijava/prijava.pogled.html',
      controller: 'prijavaCtrl',
      controllerAs: 'vm'
      })
      .when('/logout', {
        templateUrl: '/logout/logout.pogled.html',
        //controller: 'registracijaCtrl',
        controllerAs: 'vm'
      })
      .when('/db', {
        templateUrl: '/db/db.html',
        controller: 'dbCtrl',
        controllerAs: 'vm'
      })
      .otherwise({redirecTo: '/'});
    $locationProvider.html5Mode(true);
      
  }
  
  /* global angular */
  angular
    .module('dancingthings', ['ngRoute', 'ngSanitize', 'ui.bootstrap', 'vcRecaptcha'])
    .config(['$routeProvider', '$locationProvider', nastavitev]);
})();