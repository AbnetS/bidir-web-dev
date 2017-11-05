(function(angular) {
  'use strict';
  var home = {
      templateUrl: 'app/home/home.html',
      controller: 'HomeController',
      controllerAs: 'vm'
  };

  angular.module('bidirApp.home')
      .component('home', home)
      .config(routeConfig);

  /**@ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {


  }

})(window.angular);
