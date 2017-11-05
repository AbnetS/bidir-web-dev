(function(angular) {
  'use strict';
  var home = {
      templateUrl: 'app/home/home.html',
      controller: 'MainController',
      controllerAs: 'vm'
  };

  angular.module('home')
      .component('home', home)
      .config(routeConfig);

  /**@ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {


  }

})(window.angular);
