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
        //controller: 'myprofileCtrl',
        controllerAs: 'vm'
      })
      .when('/signup', {
        templateUrl: 'signup/pogledi/signup.pogled.html',
        //controller: 'signupCtrl',
        controllerAs: 'vm'
      })
      .otherwise({redirecTo: '/'});
    $locationProvider.html5Mode(true);
      
  }
  
  /* global angular */
  angular
  	.module('dancingthings', ['ngRoute', 'ngSanitize', 'ui.bootstrap'])
    .config(['$routeProvider', '$locationProvider', nastavitev]);
})();